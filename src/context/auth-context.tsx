'use client';
import React, { createContext, useEffect, useState } from 'react';
import {
    AuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    User
} from 'firebase/auth';
import { auth } from '../firebase/client';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<{
    user: User | undefined;
    authenticate: (provider: AuthProvider) => Promise<void>;
    handleLogout: () => Promise<void>;
    isModerator: boolean;
}>({
    user: undefined,
    isModerator: false,
    authenticate: async _ => {},
    handleLogout: async () => {}
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const [user, setUser] = useState<User>();
    const [isModerator, setIsModerator] = useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async user => {
            setUser(user || undefined);
            if (!user) {
                setUser(undefined);
                setIsModerator(false);
            } else {
                const tokenValues = await user.getIdTokenResult(true);
                setIsModerator(tokenValues.claims.role === 'admin');
                router.refresh()
            }
        });
        return () => unsubcribe();
    }, []);

    const authenticate = async (provider: AuthProvider) => {
        try {
            const userCred = await signInWithPopup(auth, provider)
            if (!userCred) {
                return;
            }
            const result = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`
                }
            });
            if (result.status !== 200) {
                return;
            }
            setUser(userCred.user);
            const tokenValues = await userCred.user.getIdTokenResult();
            setIsModerator(tokenValues.claims.role === 'admin');
            router.refresh()
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
        const response = await fetch('/api/signOut', {
            method: 'POST'
        });
        if (response.status === 200) {
            setUser(undefined);
            router.refresh()
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticate,
                handleLogout,
                isModerator
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
