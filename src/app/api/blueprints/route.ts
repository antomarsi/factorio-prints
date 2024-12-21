import db from "@/data/database.json"
import { buildImageUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams

    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const sort = searchParams.get("sort") || "recent";
    const limit = 20

    const database = JSON.parse(JSON.stringify((db as any).database));

    let filteredDatabase = database;
    await new Promise(r => setTimeout(r, 2000));
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
    for (var i = (page - 1) * limit; i < (page * limit); i++) {
        paginatedData.push(filteredDatabase[i])
    }
    paginatedData = paginatedData.map(v => {
        return { image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType), ...v, blueprintString: null }
    })
    return Response.json({ total: filteredDatabase.length, page, totalPage: Math.ceil(filteredDatabase.length / limit), data: paginatedData })
}