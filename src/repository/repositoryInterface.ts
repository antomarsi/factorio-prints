export interface IBlueprint {
    id: string;
    image: string;
    title: string;
    author: {
        name: string;
        id: string;
    };
    description: string;
    updated_at: Date;
    version: string;
    tags: string[];
    category: string;
    favorites: number;
}


export abstract class RepositoryInterface {
    async connect() { };

    async getBlueprints(searchTerm?: string,
        tags?: string[],
        ignoredTags?: string[],
        sort?: string,
        page?: number,
        limit?: number): Promise<{ total: number, page: number, totalPage: number, data: IBlueprint[] }> {
        throw new Error("Not implemented")
    }
    async getBlueprint(blueprintId: string) : Promise<IBlueprint> {
        throw new Error("Not implemented")
    }

    async getUser(userId: string) : Promise<any> {
        throw new Error("Not implemented")
    }

    async getAccount(token: string) : Promise<any> {
        throw new Error("Not implemented")
    }

    async getUserBlueprints(userId: string) : Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        throw new Error("Not implemented")
    }

    async getBlueprintChangelog(blueprintId: string): Promise<string[]> {
        throw new Error("Not implemented")
    }

    async createBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async favoriteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }
    async deleteBlueprint(): Promise<any> {
        throw new Error("Not implemented")
    }

    async updateUser(userId: string, description: string) : Promise<any>{
        throw new Error("Not implemented")
    }
}