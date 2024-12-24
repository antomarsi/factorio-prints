import { auth, firestore } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    const authToken = req.headers.get("authorization")?.split("Bearer ")[1] || null;

    if (!authToken || !auth) {
        return Response.json({ code: 403, message: "No permission" }, { status: 403 })
    }

    let user: DecodedIdToken | null = null;
    try {
        user = await auth.verifyIdToken(authToken)
    } catch (err) {
        console.log(err)
    }

    if (!user) {
        return Response.json({ code: 403, message: "No permission 2" }, { status: 403 })
    }
    const docSnapshot = await firestore.collection("users").doc(user.uid).get()
    return Response.json(await docSnapshot.data())
}

export async function POST(req: NextRequest) {

    const authToken = req.headers.get("authorization")?.split("Bearer ")[1] || null;

    if (!authToken || !auth) {
        return Response.json({ code: 403, message: "No permission" }, { status: 403 })
    }

    let user: DecodedIdToken | null = null;
    try {
        user = await auth.verifyIdToken(authToken)
    } catch (err) {
        console.log(err)
    }
    const { displayName, description } = await req.json()

    if (!user) {
        return Response.json({ code: 403, message: "No permission 2" }, { status: 403 })
    }
    const docRef = firestore.collection("users").doc(user.uid)
    const response = await docRef.update({
        displayName,
        description
    })
    return Response.json({})
}