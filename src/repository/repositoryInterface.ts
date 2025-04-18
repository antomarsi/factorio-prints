import "server-only"
import { createBlueprintForm, createBlueprintResponse } from "./models";
import { z } from "zod";
import { blueprintForm } from "@/schemas/blueprintForm";
import { BlueprintType } from "@/lib/blueprint";
export interface IBlueprint {
    id: string;
    image: string;
    title: string;
    author: {
        authorId: string;
        displayName: string;
    },
    descriptionMarkdown: string;
    lastUpdatedDate: number;
    createdDate: number;
    gameVersion: string;
    favorited?: boolean;
    tags: string[];
    blueprintType: string;
    numberOfFavorites: number;
    blueprintString?: string;
    imageUrl: string;
    isOwner?: boolean;
}

export type SearchBlueprintParams = {
    searchTerm?: string,
    tags?: string[],
    ignoredTags?: string[],
    sort?: string,
    page?: number,
    userId?: string,
    favoritedBy?: string
}

export type getBlueprintStringResponse = {
    blueprintType: BlueprintType,
    blueprintString: string
}

export abstract class RepositoryInterface {
    async connect() { };

    async getBlueprints({ searchTerm, tags, ignoredTags, sort, page, favoritedBy, userId }: SearchBlueprintParams): Promise<{ total: number, page: number, totalPage: number, data: IBlueprint[] }> {
        throw new Error("Not implemented")
    }
    async getBlueprint(blueprintId: string): Promise<IBlueprint | null> {
        throw new Error("Not implemented")
    }

    async getUser(userId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintString(blueprintId: string): Promise<getBlueprintStringResponse> {
        throw new Error("Not implemented")
    }

    async createBlueprint({ title, description, blueprintString, tags, imgUrl }: z.infer<typeof blueprintForm>): Promise<createBlueprintResponse> {
        throw new Error("Not implemented")
    }

    async updateBlueprint(blueprintId: string, {title, description, blueprintString, imgUrl }: createBlueprintForm): Promise<any> {
        throw new Error("Not implemented")
    }

    async favoriteBlueprint(blueprintId:string): Promise<number> {
        throw new Error("Not implemented")
    }
    async deleteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async getUserProfile(): Promise<{displayName: string, description: string, avatar: string}> {
        throw new Error("Not implemented")
    }

    async updateUser(displayName: string, description: string): Promise<any> {
        throw new Error("Not implemented")
    }
    
    async getTags() : Promise<Record<string, string[]>> {
        throw new Error("Not implemented")
    }
}