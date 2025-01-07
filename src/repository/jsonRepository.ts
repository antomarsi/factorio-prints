import "server-only";
import db from "@/data/database.json"
import { IBlueprint, RepositoryInterface } from "./repositoryInterface";
import { buildImageUrl } from "@/lib/utils";
import { writeFileSync } from "fs";

const markdown = `
## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community
`;

const changelogs = [
    `Version: 1.1.0
Date: 06. 12. 2024
  Major Features:
    - Updated to Factorio 2.0.`
];

const parseBlueprintBooks = (v: any) => {
    return Object.entries(v).map(([k, v]: [any, any]) => {
        let data = { ...v }
        if (v.blueprints) {
            data.blueprints = v.blueprints.map((b: any) => parseBlueprintBooks(b)).flat()
        }
        return data;
    });
}

export class JsonRepository extends RepositoryInterface {
    async getUser(userId: string): Promise<any> {
        const database = (db as any).database;
        const users = (db as any).users as Record<string, any>;
        const user = Object.keys(users).find(key => {
            return key == userId;
        })
        if (user) {
            return user;
        }

        let blueprints = database.filter((v: any) => v.author.userId == userId).map((v: any) => {
            return { image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType), ...v, blueprintString: null }
        })
        if (!blueprints) {
            throw new Error("Data not found", { cause: 404 })
        }

        const author = {
            id: blueprints[0].author.userId,
            username: blueprints[0].author.displayName,
            description: markdown
        }
        return { author, blueprints: blueprints }

    }

    async updateUser(userId: string, description: string): Promise<any> {
        const database = (db as any).database;
        const users = (db as any).users as Record<string, any>;
        const user = Object.keys(users).find(key => {
            return key == userId;
        })
        if (user) {
            return user;
        }

        let blueprints = database.filter((v: any) => v.author.userId == userId).map((v: any) => {
            return { image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType), ...v, blueprintString: null }
        })
        if (!blueprints) {
            throw new Error("Data not found", { cause: 404 })
        }

        const author = {
            id: blueprints[0].author.userId,
            username: blueprints[0].author.displayName,
            description: markdown
        }
        return { author, blueprints: blueprints }

    }

    async getBlueprint(blueprintId: string): Promise<IBlueprint> {
        let database = (db as any).database;

        let blueprint = database.find((v: any) => v.key == blueprintId)
        if (!blueprint) {
            throw new Error("Blueprint not found", { cause: 404 })
        }
        blueprint.image = buildImageUrl(blueprint.imgurImage.imgurId, blueprint.imgurImage.imgurType)
        blueprint.blueprintString = null
        return blueprint
    }

    async getBlueprints(searchTerm?: string, tags?: string[], ignoredTags?: string[], sort?: string, page?: number, limit?: number): Promise<{ total: number; page: number; totalPage: number; data: IBlueprint[]; }> {
        const database = JSON.parse(JSON.stringify((db as any).database));
        let currentPage = page || 1;
        let currentLimit = limit || 10;

        let filteredDatabase = database;
        if (sort) {
            if (sort == "favorited") {
                filteredDatabase.sort(function (a: any, b: any) {
                    if (a.voteSummary.numberOfUpvotes < b.voteSummary.numberOfUpvotes) {
                        return -1;
                    } else if (a.voteSummary.numberOfUpvotes > b.voteSummary.numberOfUpvotes) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (sort == "recent") {
                filteredDatabase.sort(function (a: any, b: any) {
                    if (new Date(a.version.createdOn) < new Date(b.version.createdOn)) {
                        return -1;
                    } else if (new Date(a.version.createdOn) > new Date(b.version.createdOn)) {
                        return 1;
                    }
                    return 0;
                })
            }
        }

        let paginatedData = []
        for (var i = (currentPage - 1) * currentLimit; i < (currentPage * currentLimit); i++) {
            paginatedData.push(filteredDatabase[i])
        }
        paginatedData = paginatedData.map(v => {
            return { image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType), ...v, blueprintString: null }
        })
        return { total: filteredDatabase.length, page: currentPage, totalPage: Math.ceil(filteredDatabase.length / currentLimit), data: paginatedData }
    }

    async getBlueprintChangelog(blueprintId: string): Promise<string[]> {
        let database = (db as any).database;

        let blueprint = database.find((v: any) => v.key == blueprintId)
        if (!blueprint) {
            throw new Error("Blueprint not found", { cause: 404 })
        }
        return changelogs
    }
    async getBlueprintContentTiles(blueprintId: string): Promise<any> {
        const database = (db as any).database;
        let blueprint = database.filter((v: any) => v.key == blueprintId)
        if (!blueprint) {
            throw new Error("Blueprint not found", { cause: 404 })
        }

        let contentTiles = blueprint.map((v: any) => {
            let contentTiles = v.blueprintString.contentTiles
            if (!contentTiles) {
                return [];
            } else {
                return parseBlueprintBooks(contentTiles);
            }
        }).flat()
        return contentTiles;

    }
}