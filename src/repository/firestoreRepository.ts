import "server-only";
import { IBlueprint, RepositoryInterface, SearchBlueprintParams } from "./repositoryInterface";
import { auth, firestore } from "@/firebase/server";
import { CollectionReference, DocumentData, Query } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";
import { createBlueprintForm, updateBlueprintForm } from "./models";
import { buildImageUrl, ERROR_TYPE, getImgurIdType } from "@/lib/utils";
import Blueprint from "@/lib/blueprint";


export class FirestoreRepository extends RepositoryInterface {
    async getBlueprints({ searchTerm, tags, ignoredTags, sort, page }: SearchBlueprintParams): Promise<{ total: number, page: number, totalPage: number, data: IBlueprint[] }> {
        const limit = 10
        let blueprintsRef: CollectionReference | Query<DocumentData, DocumentData> = firestore.collection("blueprints");
        if (tags) {
            tags.forEach((v) => {
                blueprintsRef = blueprintsRef.where(`tags.${v}`, "==", true)
            })
        }
        if (ignoredTags) {
            ignoredTags.forEach((v) => {
                blueprintsRef = blueprintsRef.where(`tags.${v}`, "!=", true)
            })
        }

        switch (sort) {
            case "recent":
                blueprintsRef = blueprintsRef.orderBy("lastUpdatedDate")
                break;
            case "favorited":
                blueprintsRef = blueprintsRef.orderBy("favorites")
                break;
        }

        const totalRef = await blueprintsRef.count().get()
        const total = totalRef.data().count

        
        if (page && page > 1) {

        }

        const blueprints = await blueprintsRef.limit(limit).get()

        return {
            total: total,
            page: page || 1,
            data: blueprints.docs.map(v => {
                const data = v.data()
                return { ...data, id: v.id, tags: Object.keys(data.tags), image: buildImageUrl(data.image.id, data.image.type) }
            }
            ) as IBlueprint[],
            totalPage: Math.ceil(total/limit)
        }
    }
    async getBlueprint(blueprintId: string): Promise<IBlueprint> {
        const blueprintRef = await firestore.collection("blueprints").doc(blueprintId).get()

        const data = blueprintRef.data();
        if (!data) {
            throw new Error("Blueprint not found")
        }
        data.tags = Object.keys(data.tags)
        data.id = blueprintRef.id
        data.image =  buildImageUrl(data.image.id, data.image.type)
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

    async getUserBlueprints(userId: string): Promise<any> {
        const userData = await auth.getUser(userId)
        const blueprints = await firestore.collection("blueprints").where("authorId", "==", userId).get()
        return blueprints.docs.map(d => ({ ...d.data(), displayName: userData.displayName }))
    }

    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintChangelog(blueprintId: string): Promise<string[]> {
        throw new Error("Not implemented")
    }

    async createBlueprint({ title, description, blueprintString, tags, imgUrl }: createBlueprintForm): Promise<any> {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('firebaseIdToken')?.value;

        if (!authToken || !auth) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }
        let user: DecodedIdToken | null = null;
        try {
            user = await auth.verifyIdToken(authToken);
        } catch (error) {
            return {
                success: false,
                type: ERROR_TYPE.USER_NOT_FOUND,
                error: "User not found"
            }
        }
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
        let imgInfo: { id: string, type: string }
        try {
            imgInfo = await getImgurIdType(imgUrl)
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
            lastUpdatedDate: Date.now(),
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
            createdDate: Date.now(),
        })
        return {
            success: true,
            id: result.id
        }
    }

    async updateBlueprint({ blueprintId, title, description, blueprintString, imgUrl, tags }: updateBlueprintForm): Promise<any> {
        throw new Error("Not implemented")
    }

    async favoriteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }
    async deleteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateUser(displayName: string, description: string): Promise<any> {
        const cookieStore = await cookies();
        const authToken = cookieStore.get('firebaseIdToken')?.value;

        if (!authToken || !auth) {
            throw new Error("User not found")
        }
        let user: DecodedIdToken | null = null;
        try {
            user = await auth.verifyIdToken(authToken);
        } catch (error) {
            throw new Error("User not found")
        }
        if (!user) {
            throw new Error("User not found")
        }
        const result = await firestore.collection("users").doc(user.uid).update({
            displayName,
            description
        })

        return true;
    }
}