"use server"

import repository from "@/repository";
import { revalidateTag } from "next/cache";


export const favoriteBlueprint = async (id: string) => {
    const favoriteCount = await repository.favoriteBlueprint(id);
    revalidateTag("user-info")
    return favoriteCount
};
