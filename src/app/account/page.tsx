import React from 'react';
import { Panel, PanelInset } from '../components/Panel';
import { cookies } from 'next/headers';
import { DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '@/firebase/server';
import { AccountForm, IFormInput } from './form';
import repository from '@/repository';
import { SubmitHandler } from 'react-hook-form';

const NoAuth = () => {
    return (
        <Panel title='Account Settings'>
            <PanelInset>
                <p>
                    Please log in with Google or GitHub in order to edit your
                    account settings.
                </p>
            </PanelInset>
        </Panel>
    );
};

export default async function AccountSettingsPage () {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('firebaseIdToken')?.value;

    if (!authToken || !auth) {
        return <NoAuth />;
    }
    let user: DecodedIdToken | null = null;
    try {
        user = await auth.verifyIdToken(authToken);
    } catch (error) {
        return <NoAuth />;
    }
    if (!user) {
        return <NoAuth />;
    }
    const userInfoResponse = await repository.getUser(user?.uid);

    const onSubmit : SubmitHandler<IFormInput> = async (data) => {
        "use server";
        repository.updateUser(data.displayName, data.description)
    }
    
    return (
        <>
            <Panel title='Account Settings' className='medium-center'>
                <PanelInset>
                    <AccountForm
                        onSubmit={onSubmit}
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
