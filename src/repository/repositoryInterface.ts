import "server-only"
import { createBlueprintForm, updateBlueprintForm } from "./models";
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
    version: string;
    tags: string[];
    blueprintType: string;
    numberOfFavorites: number;
}

export type SearchBlueprintParams = {
    searchTerm?: string,
    tags?: string[],
    ignoredTags?: string[],
    sort?: string,
    page?: number
}

export abstract class RepositoryInterface {
    async connect() { };

    async getBlueprints({ searchTerm, tags, ignoredTags, sort, page }: SearchBlueprintParams): Promise<{ total: number, page: number, totalPage: number, data: IBlueprint[] }> {
        throw new Error("Not implemented")
    }
    async getBlueprint(blueprintId: string): Promise<IBlueprint> {
        throw new Error("Not implemented")
    }

    async getUser(userId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getUserBlueprints(userId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintChangelog(blueprintId: string): Promise<string[]> {
        throw new Error("Not implemented")
    }

    async createBlueprint({title, description, blueprintString, imgUrl} : createBlueprintForm): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateBlueprint({blueprintId, title, description, blueprintString, imgUrl} : updateBlueprintForm): Promise<any> {
        throw new Error("Not implemented")
    }

    async favoriteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }
    async deleteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateUser(displayName: string, description: string): Promise<any> {
        throw new Error("Not implemented")
    }
}