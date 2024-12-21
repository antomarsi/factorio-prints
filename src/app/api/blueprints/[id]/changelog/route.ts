import db from "@/data/database.json"
import { buildImageUrl } from "@/lib/utils";
import { NextApiRequest } from "next";
const changelogs = [
    `Version: 1.1.0
Date: 06. 12. 2024
  Major Features:
    - Updated to Factorio 2.0.`
];
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
        return Response.json(changelogs)
    }

    return Response.json({ code: 404, message: "Data not found" }, { status: 404 })
}