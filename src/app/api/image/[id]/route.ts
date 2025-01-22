import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (!id) {
        return Response.json({ code: 404, message: "Img not found" }, { status: 404 })
    }
    await fetch(``)
}