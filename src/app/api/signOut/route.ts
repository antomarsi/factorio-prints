import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    //Remove the value and expire the cookie

    (await cookies()).set({
        name: "firebaseIdToken",
        value: "",
        maxAge: -1,
    });
    return NextResponse.json({}, { status: 200 });
}