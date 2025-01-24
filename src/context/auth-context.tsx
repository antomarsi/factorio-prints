'use client';
import React, { createContext, useEffect, useState } from 'react';
import {
    AuthProvider,
    onAuthStateChanged,
    onIdTokenChanged,
    signInWithPopup,
    User
} from 'firebase/auth';
import { auth } from '../firebase/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie, getCookie, setCookie } from "cookies-next/client"

export function getAuthToken (): string | undefined {
    return getCookie('firebaseIdToken');
}

export function setAuthToken (token: string): void {
    setCookie("firebaseIdToken", token, {secure: true})
}

export function removeAuthToken (): void {
    deleteCookie("firebaseIdToken")
}

export const AuthContext = createContext<{
    user: User | undefined;
    authenticate: (provider: AuthProvider) => Promise<void>;
    handleLogout: () => Promise<void>;
    reloadUser: () => void;
    isModerator: boolean;
    loading: boolean;
}>({
    user: undefined,
    isModerator: false,
    authenticate: async _ => {},
    handleLogout: async () => {},
    reloadUser: () => {},
    loading: true
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const searchParams = useSearchParams();
    const [user, setUser] = useState<User>();
    const [isModerator, setIsModerator] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const redirect = searchParams.get("redirect")
        const unsubcribe = onAuthStateChanged(auth, async user => {
            setUser(user || undefined);
            if (!user) {
                setUser(undefined)
                setLoading(false);
                setIsModerator(false);
                removeAuthToken();
            } else {
                const tokenValues = await user.getIdTokenResult(true);
                setIsModerator(tokenValues.claims.role === 'admin');
                setLoading(false);
                const token = await user.getIdToken();
                setAuthToken(token)
                if (redirect) {
                    router.replace(redirect)
                } else {
                    router.refresh()
                }
            }
            if (pathname.startsWith("/account")) {
                if (redirect) {
                    router.replace(redirect)
                } else {
                    router.refresh()
                }
            }
        });
        return () => unsubcribe();
    }, []);

    useEffect(() => {
        const unsubcribe = onIdTokenChanged(auth, async user => {
            setUser(user || undefined);
            if (!user) {
                setUser(undefined)
                setLoading(false);
                setIsModerator(false);
                removeAuthToken();
                router.refresh()
            } else {
                try {
                    const tokenValues = await user.getIdTokenResult(true);
                    setIsModerator(tokenValues.claims.role === 'admin');
                    setLoading(false);
                    const token = await user.getIdToken();
                    setAuthToken(token)
                    router.refresh()
                } catch(e) {
                    setLoading(false);
                    await handleLogout()
                }
            }
            if (pathname.startsWith("/account")) {
                router.refresh()
            }
        });
        return () => unsubcribe();
    }, []);

    const authenticate = async (provider: AuthProvider) => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            setLoading(false);
        } catch (error: any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.error({ error, errorCode, errorMessage, email });
            setUser(undefined);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        removeAuthToken()
        setUser(undefined)
    };
    const reloadUser = async () => {
        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken(true);
            setAuthToken(token)
            setUser(auth.currentUser);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticate,
                handleLogout,
                reloadUser,
                loading,
                isModerator
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
