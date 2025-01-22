import { ERROR_TYPE } from "@/lib/utils"

export type createBlueprintForm = {
    title: string,
    description: string,
    blueprintString: string,
    imgUrl: string,
    tags?: string[]
}

export type createBlueprintResponse = {
    success: boolean,
    type?: ERROR_TYPE,
    error?: string,
    id?: string
}