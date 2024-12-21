import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { auth, config } from "firebase-functions/v1"

initializeApp(config().firebase)

export const onUserCreate = auth.user().onCreate(async (user) => {
    await getFirestore().doc(`users/${user.uid}`).create({
        isModerator: false
    })
})