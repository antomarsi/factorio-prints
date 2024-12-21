import db from "@/data/database.json"
import { NextApiRequest } from "next";


const parseBlueprintBooks = (v: any) => {
  return Object.entries(v).map(([k, v]: [any, any]) => {
    let data = { ...v }
    if (v.blueprints) {
      data.blueprints = v.blueprints.map((b: any) => parseBlueprintBooks(b)).flat()
    }
    return data;
  });
}

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const database = (db as any).database;
  let blueprint = database.filter((v: any) => v.key == id)
  if (blueprint) {
    let contentTiles = blueprint.map((v: any) => {
      let contentTiles = v.blueprintString.contentTiles
      if (!contentTiles) {
        return [];
      } else {
        return parseBlueprintBooks(contentTiles);
      }
    }).flat()
    return Response.json(contentTiles)
  }
  return Response.json({ code: 404, message: "Data not found" }, { status: 404 })

}