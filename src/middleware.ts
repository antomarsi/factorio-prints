import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";

export default async function middleware(req: NextRequest) {
    const protectedRoutes: string[] = []

    const currentPath = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath)
    
    if (isProtectedRoute) {
        const authToken = (await cookies()).get("firebaseIdToken")?.value
        if (!authToken) {

        }

        if (!authToken || !auth) {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }

        let user: DecodedIdToken | null = null;
        try {
            user = await auth.verifyIdToken(authToken)
        } catch (err) {
            console.log(err)
        }

        if (!user) {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image).*)"]
}