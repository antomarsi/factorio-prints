import { z } from "zod";


export const accountFormSchema = z.object({
    displayName: z.string().min(3),
    description: z.string().max(600)
})