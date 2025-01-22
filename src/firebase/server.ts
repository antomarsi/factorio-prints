import "server-only";
import serviceAccount from "./serviceAccount.json"
import { initializeApp } from "firebase-admin/app";
import { App, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, DecodedIdToken, getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const currentApps = getApps();

let app: App

if (currentApps.length <= 0) {
    app = initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
    })
} else {
    app = currentApps[0];
}

export const firestore: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

export async function getCurrentUser() {
    if (!auth) return null;
    const session = await getSession();
    if (!session) return null
    let decodedIdToken : DecodedIdToken | null = null
    try {
        decodedIdToken = await auth.verifyIdToken(session);
    } catch (err) {
        console.error("Session was revoked")
        return null
    }
    if (!decodedIdToken) return null;

    const currentUser = await auth.getUser(decodedIdToken.uid);

    return currentUser;
}

async function getSession() {
    try {
        const cookieStore = await cookies()
        return cookieStore.get('firebaseIdToken')?.value;
    } catch (error) {
        return undefined;
    }
}
