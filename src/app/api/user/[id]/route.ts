import db from "@/data/database.json"
import { buildImageUrl } from "@/lib/utils";
import { NextApiRequest } from "next";

const markdown = `
## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community
`;


export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        return Response.json({ code: 404, message: "Data not found" }, { status: 404 })
    }
    const database = (db as any).database;

    let blueprints = database.filter((v: any) => v.author.userId == id).map((v: any) => {
        return { image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType), ...v, blueprintString: null }
    })

    await new Promise(r => setTimeout(r, 2000));
    if (blueprints) {
        const author = {
            id: blueprints[0].author.userId,
            username: blueprints[0].author.displayName,
            description: markdown
        }
        return Response.json({ author, blueprints: blueprints })
    }
    return Response.json({ code: 404, message: "Data not found" }, { status: 404 })

}