import React from 'react';
import { Panel, PanelInset } from '../components/Panel';
import { cookies } from 'next/headers';
import { DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '@/firebase/server';
import { getAccount } from '@/lib/api';
import { AccountForm } from './form';

export default async function AccountSettingsPage () {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('firebaseIdToken')?.value;

    if (!authToken || !auth) {
        return (
            <Panel title='Account Settings'>
                <PanelInset>
                    <p>
                        Please log in with Google or GitHub in order to edit
                        your account settings.
                    </p>
                </PanelInset>
            </Panel>
        );
    }
    let user: DecodedIdToken | null = null;
    try {
        user = await auth.verifyIdToken(authToken);
    } catch (error) {
        console.log(error);
    }
    const userInfoResponse = await getAccount(authToken);

    return (
        <>
            <Panel title='Account Settings' className='medium-center'>
                <PanelInset>
                    <AccountForm
                        defaultValues={{
                            displayName: userInfoResponse.displayName,
                            description: userInfoResponse.description
                        }}
                    />
                </PanelInset>
            </Panel>
        </>
    );
}
