'use client';
import { Panel, PanelInset } from '@/app/components/Panel';
import { AuthContext, setAuthToken } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useCallback, useContext, useEffect, useState } from 'react';

export default function RefreshPage () {
    const searchParams = useSearchParams();
    const { user, handleLogout } = useContext(AuthContext);
    const router = useRouter();

    const checkAuth = useCallback(async () => {
        if (!user) {
            await handleLogout();
            //router.replace('/');
            return;
        } else {
            try {
                const token = await user.getIdToken(true);
                setAuthToken(token);
                const redirect = searchParams.get('redirect');
                router.replace(redirect || '/');
            } catch (e) {
                await handleLogout();
                router.replace('/');
            }
        }
    }, [user]);

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
