import "server-only"
import { getImgurId } from "./utils"

export async function getServerImgurIdType(imgUrl: string): Promise<{ id: string, type: string } | null> {
    const imgId = getImgurId(imgUrl)
    let headers = {}

    const response = await fetch(`https://api.imgur.com/3/image/${imgId}`, {
        headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
        }
    })
    const data = await response.json()
    if (data.success == false) {
        throw new Error("Not a valid Imgur Url")
    }
    if (data.errors) {
        if (data.errors.findIndex((v: any) => v.code === "429") != -1) {
            return null;
        }
    }

    return {
        id: data.data.id,
        type: data.data.type
    }
}