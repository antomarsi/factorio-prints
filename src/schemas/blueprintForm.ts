import Blueprint from "@/lib/blueprint";
import { imgurRegexValidation } from "@/lib/utils";
import { z } from "zod";



export const blueprintForm = z.object({
    title: z.string().min(10, "Title must be at least 10 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    blueprintString: z.string().min(10, "Blueprint String must be at least 10 characters").refine((v) => {
        const blueprint = new Blueprint(v)
        return blueprint.validate()
    }, { message: "Blueprint is not valid" }),
    tags: z.string().array().optional(),
    imgUrl: z.string().regex(imgurRegexValidation, "Please use a direct link to an image like https://imgur.com/{id} or https://i.imgur.com/{id}.{ext}")
})