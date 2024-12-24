import 'server-only'
import { notFound } from 'next/navigation';

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


const parseApiData = (v: any) => {
    return {
        id: v.key,
        title: v.title,
        image: v.image,
        description: v.descriptionMarkdown,
        tags: v.tags.map((t: any) => `${t.tagCategory}/${t.tagName}`),
        author: {
            name: v.author.displayName,
            id: v.author.userId
        },
        updated_at: new Date(v.version.createdOn),
        category: "Blueprint",
        favorites: v.voteSummary.numberOfUpvotes,
        version: "2.0.0"
    }
}

export const searchBlueprints = async (params: {
    searchTerm?: string;
    tags?: string[] | string;
    ignoredTags?: string[] | string;
    sort?: string;
    page?: string;
}): Promise<{ totalBlueprints: number, page: number, totalPage: number, items: IBlueprint[] }> => {
    const { tags, ignoredTags, sort, ...otherParams } = params
    const searchParams = new URLSearchParams(otherParams)
    if (sort) {
        searchParams.append("sort", sort)
    }
    if (Array.isArray(tags)) {
        tags.forEach(v => searchParams.append("tags", v))
    } else if (tags !== undefined) {
        searchParams.append("tags", tags)
    }
    if (Array.isArray(ignoredTags)) {
        ignoredTags.forEach(v => searchParams.append("ignoredTags", v))
    } else if (ignoredTags !== undefined) {
        searchParams.append("ignoredTags", ignoredTags)
    }
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blueprints`)
    url.search = searchParams.toString()

    const response = await fetch(url)
    const { total, data, page, totalPage } = await response.json()

    const parsedData = data.map((v: any) => parseApiData(v))

    return { totalBlueprints: total, items: parsedData, page: +page, totalPage }
}

export const searchUser = async (userId: String): Promise<any> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`)
    const result = await fetch(url)
    if (result.status === 404) {
        notFound()
    }
    const data = await result.json()
    return data
}

export const getAccount = async (token: string): Promise<any> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/user/account`)
    const result = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (result.status === 404) {
        notFound()
    }
    const data = await result.json()
    return data
}

export const searchBlueprint = async (userId: String): Promise<IBlueprint> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blueprints/${userId}`)
    const result = await fetch(url)
    if (result.status === 404) {
        notFound()
    }
    const data = await result.json()

    return parseApiData(data)
}

export const searchContentTiles = async (blueprintId: string): Promise<any> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blueprints/${blueprintId}/content-tiles`)
    const result = await fetch(url)
    if (result.status === 404) {
        notFound()
    }
    const data = await result.json()
    return data;
}

export const searchBlueprintChangelog = async (blueprintId: string): Promise<any[]> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blueprints/${blueprintId}/changelog`)
    const result = await fetch(url)
    if (result.status === 404) {
        notFound()
    }
    const data = await result.json()
    return data;
}

export const createBlueprint = async (): Promise<any> => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blueprints`)
    const result = await fetch(url, { method: "POST" })
    const data = await result.json()
    return data;
}