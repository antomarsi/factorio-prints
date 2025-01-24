import "server-only";
import { IBlueprint, RepositoryInterface, SearchBlueprintParams } from "./repositoryInterface";
import { auth, firestore, getCurrentUser } from "@/firebase/server";
import { CollectionReference, DocumentData, FieldValue, Query } from "firebase-admin/firestore";
import { createBlueprintForm, createBlueprintResponse } from "./models";
import { buildImageUrl, ERROR_TYPE } from "@/lib/utils";
import Blueprint from "@/lib/blueprint";
import { getServerImgurIdType } from "@/lib/server_utils";
import tagsFile from '@/assets/tags.json';


export class FirestoreRepository extends RepositoryInterface {
    async getBlueprints({ searchTerm, tags, ignoredTags, sort, page, userId, favoritedBy }: SearchBlueprintParams): Promise<{ total: number, page: number, totalPage: number, data: IBlueprint[] }> {

        const limit = 10

        let blueprintsRef: CollectionReference | Query<DocumentData, DocumentData> = firestore.collection("blueprints");

        if (userId) {
            blueprintsRef = blueprintsRef.where("author.authorId", "==", userId)
        }

        if (favoritedBy) {
            blueprintsRef = blueprintsRef.where(`favorites.${favoritedBy}`, "==", true)
        }

        if (tags) {
            tags.forEach((v) => {
                blueprintsRef = blueprintsRef = blueprintsRef.where(`tags.${v}`, "==", true)
            })
        }

        if (ignoredTags) {
            ignoredTags.forEach((v) => {
                blueprintsRef = blueprintsRef.where(`tags.${v}`, "!=", true)
            })
        }

        switch (sort) {
            case "recent":
                blueprintsRef = blueprintsRef.orderBy("lastUpdatedDate", 'desc')
                break;
            case "favorited":
                blueprintsRef = blueprintsRef.orderBy("favorites", 'desc')
                break;
        }
        if (searchTerm) {

        }

        const totalRef = await blueprintsRef.count().get()
        const total = totalRef.data().count


        if (page && page > 1) {
            blueprintsRef = blueprintsRef.offset((page - 1) * limit)
        }

        const blueprints = await blueprintsRef.limit(limit).get()

        return {
            total: total,
            page: page || 1,
            data: blueprints.docs.map(v => {
                const { favorites, ...data } = v.data()
                return {
                    ...data,
                    id: v.id,
                    tags: Object.keys(data.tags),
                    image: data.image ? buildImageUrl(data.image.id, data.image.type) : data.imgUrl
                }
            }
            ) as IBlueprint[],
            totalPage: Math.ceil(total / limit)
        }
    }
    async getBlueprint(blueprintId: string): Promise<IBlueprint | null> {
        const blueprintRef = await firestore.collection("blueprints").doc(blueprintId).get()
        const user = await getCurrentUser()


        const data = blueprintRef.data();
        if (!data) {
            return null;
        }
        data.tags = Object.keys(data.tags)
        data.id = blueprintId
        data.imageUrl = data.imageUrl;
        data.image = data.image ? buildImageUrl(data.image.id, data.image.type) : data.imgUrl;
        data.isOwner = user ? user.uid == data.author.authorId : false;
        delete data.favorites;
        return data as IBlueprint;
    }

    async getUser(userId: string): Promise<any> {
        const userRef = await firestore.collection("users").doc(userId).get()
        const user = userRef.data()
        if (!user) {
            throw new Error("User not found")
        }
        const userData = await auth.getUser(userId)
        user.displayName = userData.displayName;
        user.avatar = userData.photoURL;
        return user;
    }

    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async createBlueprint({ title, description, blueprintString, tags, imgUrl }: createBlueprintForm): Promise<createBlueprintResponse> {
        const user = await getCurrentUser()
        if (!user) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }
        const userRef = await firestore.collection("users").doc(user.uid).get()
        const userData = userRef.data()

        if (!userData) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }
        let imgInfo: { id: string, type: string } | null
        try {
            imgInfo = await getServerImgurIdType(imgUrl)
        } catch (e) {
            return {
                success: false,
                type: ERROR_TYPE.INVALID_IMGUR,
                error: "Invalid Imgur link"
            }
        }

        const blueprint = new Blueprint(blueprintString)
        if (!blueprint.validate()) {
            return {
                success: false,
                type: ERROR_TYPE.INVALID_BLUEPRINT,
                error: "invalid blueprint"
            }
        }

        const result = await firestore.collection("blueprints").add({
            favorites: {},
            image: imgInfo,
            lastUpdatedDate: FieldValue.serverTimestamp(),
            numberOfFavorites: 0,
            title: title,
            descriptionMarkdown: description,
            imageUrl: imgUrl,
            tags: {},
            blueprintType: blueprint.blueprintType,
            author: {
                authorId: user.uid,
                displayName: userData.displayName
            },
            blueprintString: blueprintString,
            gameVersion: blueprint.versionString,
            createdDate: FieldValue.serverTimestamp(),
        })
        return {
            success: true,
            id: result.id
        }
    }

    async updateBlueprint(blueprintId: string, { title, description, blueprintString, imgUrl, tags }: createBlueprintForm): Promise<createBlueprintResponse> {
        const user = await getCurrentUser()
        if (!user) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }
        const userRef = await firestore.collection("users").doc(user.uid).get()
        const userData = userRef.data()

        if (!userData) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }

        const blueprintRef = firestore.collection("blueprints").doc(blueprintId)
        let updateData: any = {}

        const blueprintData = (await blueprintRef.get()).data()
        if (!blueprintData || blueprintData.author.authorId != user.uid) {
            return {
                success: false,
                type: ERROR_TYPE.NOT_AUTHORIZED,
                error: "This is not authorized"
            }
        }

        if (imgUrl !== blueprintData.imageUrl) {
            let imgInfo: { id: string, type: string } | null
            try {
                imgInfo = await getServerImgurIdType(imgUrl)
                updateData.image = imgInfo
            } catch (e) {
                return {
                    success: false,
                    type: ERROR_TYPE.INVALID_IMGUR,
                    error: "Invalid Imgur link"
                }
            }
            updateData.imgUrl = imgUrl
        }
        if (blueprintString != blueprintData.blueprintString) {
            const blueprint = new Blueprint(blueprintString)
            if (!blueprint.validate()) {
                return {
                    success: false,
                    type: ERROR_TYPE.INVALID_BLUEPRINT,
                    error: "invalid blueprint"
                }
            }
            updateData.blueprintString = blueprintString
            if (blueprint.blueprintType != blueprintData.blueprintType) {
                updateData.blueprintType = blueprint.blueprintType
            }
            if (blueprint.versionString != blueprintData.versionString) {
                updateData.versionString = blueprint.versionString
            }
        }
        if (title != blueprintData.title) {
            updateData.title = title
        }
        if (description != blueprintData.descriptionMarkdown) {
            updateData.descriptionMarkdown = description
        }
        if (tags != blueprintData.tags) {
            updateData.tags = tags
        }

        await blueprintRef.update({
            lastUpdatedDate: FieldValue.serverTimestamp(),
            ...updateData
        })
        return {
            success: true,
            id: blueprintId
        }
    }

    async favoriteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }
    async deleteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateUser(displayName: string, description: string): Promise<any> {
        const user = await getCurrentUser()
        if (!user) {
            throw new Error("User not found")
        }
        const result = await firestore.collection("users").doc(user.uid).update({
            displayName,
            description
        })

        return true;
    }

    async getTags(): Promise<Record<string, string[]>> {
        return tagsFile;
    }
}