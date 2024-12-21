import db from "@/data/database.json"
import { buildImageUrl } from "@/lib/utils";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        return Response.json({ code: 404, message: "Data not found" }, { status: 404 })
    }

    let database = (db as any).database;

    let blueprint = database.find((v: any) => v.key == id)
    await new Promise(r => setTimeout(r, 2000));
    if (blueprint) {
        blueprint.image = buildImageUrl(blueprint.imgurImage.imgurId, blueprint.imgurImage.imgurType)
        blueprint.blueprintString = null
        return Response.json(blueprint)
    }

    return Response.json({ code: 404, message: "Data not found" }, { status: 404 })
}