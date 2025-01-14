export type createBlueprintForm = {
    title: string,
    description: string,
    blueprintString: string,
    imgUrl: string,
    tags: string[]
}

export type updateBlueprintForm = createBlueprintForm & {
    blueprintId: string
}