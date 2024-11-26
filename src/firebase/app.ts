import { FirebaseOptions, getApps, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAh1M8Ax0QBm4gJw1S6Mf4nxK735qwtZAM",
    authDomain: "factorio-blueprints-cb608.firebaseapp.com",
    databaseURL: "https://factorio-blueprints-cb608-default-rtdb.firebaseio.com",
    projectId: "factorio-blueprints-cb608",
    storageBucket: "factorio-blueprints-cb608.firebasestorage.app",
    messagingSenderId: "18037327340",
    appId: "1:18037327340:web:da808713a631260d7e2cc9",
    measurementId: "G-8JL9EMLMHQ"
}

let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app)

if (process.env.NODE_ENV !== "production") {
    connectAuthEmulator(auth, "http://localhost:9099")
}

export { app, auth }