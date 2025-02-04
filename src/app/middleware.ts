import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    {path: '/about', whenAuthenticated: "next"},
    {path: '/blueprint', whenAuthenticated: "next"},
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const publicRoute = publicRoutes.find(route => route.path === path)

    const authToken = request.cookies.get("firebaseIdToken")

    if (!authToken && publicRoute) {
        return NextResponse.next()
    }
    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
        return NextResponse.redirect(redirectUrl)
    }

    if (!authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && !publicRoute) {

        const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
            headers: {
              Cookie: `session=${authToken?.value}`,
            },
          });
        if (responseAPI.status !== 200) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = "/"
            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next()
    }


    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}