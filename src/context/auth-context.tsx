import React, { createContext, useState } from "react";
import {
    AuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    User,
} from "firebase/auth";
import { auth } from "../firebase/app";

export const AuthContext = createContext<{
    user: User | undefined;
    authenticate: (provider: AuthProvider) => Promise<void>;
    handleLogout: () => Promise<void>
    reloadUser: () => void
}>({
    user: undefined,
    authenticate: async (_) => {},
    handleLogout: async () => {},
    reloadUser: () => {}
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<User>();

    onAuthStateChanged(auth, (user) => setUser(user || undefined));

    const authenticate = async (provider: AuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error: any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.error({ error, errorCode, errorMessage, email });
            setUser(undefined);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
    };
    const reloadUser = () => {
        if (auth.currentUser) {
            setUser(auth.currentUser)
        }
        console.log(auth.currentUser?.displayName)
    }

    return (
        <AuthContext.Provider
            value={{ user, authenticate, handleLogout, reloadUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
