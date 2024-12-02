

interface IBlueprint {
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

export const searchBlueprints = async (params: {
    searchTerm?: string;
    tags?: string[] | string;
    ignoredTags?: string[] | string;
    sort?: string;
    page?: string;
}): Promise<{ totalBlueprints: number, page: number, totalPage: number, items: IBlueprint[] }> => {
    const { tags, ignoredTags, ...otherParams } = params
    const searchParams = new URLSearchParams(otherParams)
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
    const url = new URL(`${process.env.NEXT_PUBLIC_APP_REST_URL}/api/blueprints`)
    url.search = searchParams.toString()

    const response = await fetch(url)
    const { total, data, page, totalPage } = await response.json()

    const parsedData = data.map((v: any) => ({
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
    }))

    return { totalBlueprints: total, items: parsedData, page: +page, totalPage }
}