import "server-only";
import serviceAccount from "./serviceAccount.json"
import { initializeApp } from "firebase-admin/app";
import { App, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";


const currentApps = getApps();

let app: App

if (currentApps.length <= 0) {
    app = initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
    })
} else {
    app = currentApps[0];
}

const firestore: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { firestore, auth }