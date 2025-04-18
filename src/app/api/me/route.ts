import repository from "@/repository";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await repository.getUserProfile()

    return NextResponse.json(result, { status: 200 });
}