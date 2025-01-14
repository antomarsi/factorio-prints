import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { auth } from "firebase-functions/v1"
import { onDocumentUpdatedWithAuthContext } from "firebase-functions/v2/firestore"

initializeApp()
const db = getFirestore()

export const onUserCreate = auth.user().onCreate(async (user) => {
    await getFirestore().doc(`users/${user.uid}`).create({
        isModerator: false,
        description: "",
        favorites: [],
        blueprints: []
    })
})

export const onUserUpdate = onDocumentUpdatedWithAuthContext("users/{userId}", (event) => {
    if (event.data) {
        if (!event.data.after) {
            console.log("No data associated with the event")
            return;
        }
        const afterDisplayName = event.data.after.data().displayName;
        const beforeDisplayName = event.data.before.data().displayName;
        if (afterDisplayName != beforeDisplayName) {
            db.collection("blueprints").where("authorId", "==", event.authId)
        }
    }
})