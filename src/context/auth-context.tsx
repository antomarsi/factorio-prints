'use client';
import React, { createContext, useEffect, useState } from 'react';
import {
    AuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    User
} from 'firebase/auth';
import { auth } from '../firebase/client';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

export function getAuthToken (): string | undefined {
    return Cookies.get('firebaseIdToken');
}

export function setAuthToken (token: string): string | undefined {
    return Cookies.set('firebaseIdToken', token, { secure: true });
}

export function removeAuthToken (): void {
    Cookies.remove('firebaseIdToken');
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
    const [user, setUser] = useState<User>();
    const [isModerator, setIsModerator] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async user => {
            setUser(user || undefined);
            if (!user) {
                setLoading(false);
                setIsModerator(false);
                removeAuthToken();
                router.refresh()
            } else {
                const tokenValues = await user.getIdTokenResult();
                setIsModerator(tokenValues.claims.role === 'admin');
                setLoading(false);
                const token = await user.getIdToken();
                setAuthToken(token);
                router.refresh()
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
    };
    const reloadUser = () => {
        if (auth.currentUser) {
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
