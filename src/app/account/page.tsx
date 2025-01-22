import React from 'react';
import { Panel, PanelInset } from '../components/Panel';
import { cookies } from 'next/headers';
import { DecodedIdToken } from 'firebase-admin/auth';
import { auth, getCurrentUser } from '@/firebase/server';
import { AccountForm, IFormInput } from './form';
import repository from '@/repository';
import { SubmitHandler } from 'react-hook-form';
import { redirect } from 'next/navigation';

export default async function AccountSettingsPage () {
    const user = await getCurrentUser();
    if (!user) {
        redirect(`/user/refresh?redirect=/account`);
    }
    const userInfoResponse = await repository.getUser(user.uid);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        'use server';
        repository.updateUser(data.displayName, data.description);
    };

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
