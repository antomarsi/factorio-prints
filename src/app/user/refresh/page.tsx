'use client';
import { Panel, PanelInset } from '@/app/components/Panel';
import { AuthContext, removeAuthToken, setAuthToken } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useCallback, useContext, useEffect, useState } from 'react';

export default function RefreshPage () {
    const searchParams = useSearchParams();
    const { user, handleLogout, reloadUser } = useContext(AuthContext);
    const router = useRouter();

    const checkAuth = async () => {
        if (!user) {
            await handleLogout();
            return;
        } else {
            try {
                await reloadUser()
                const redirect = searchParams.get('redirect');
                router.replace(redirect || '/');
            } catch (e) {
                removeAuthToken()
                await handleLogout();
                router.replace('/');
            }
        }
    }

    useEffect(() => {
        checkAuth();
    }, [user]);

    if (!user) {
        return (
            <Panel title='You are not logged'>
                <PanelInset>
                    <p>
                        Please log in with Google or GitHub in order to continue
                    </p>
                </PanelInset>
            </Panel>
        );
    }

    return <>Refreshing</>;
}
