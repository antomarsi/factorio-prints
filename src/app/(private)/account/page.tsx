import React from 'react';
import { Panel, PanelInset } from '@/components/Panel';
import { getCurrentUser } from '@/firebase/server';
import { AccountForm, IFormInput } from './form';
import repository from '@/repository';
import { SubmitHandler } from 'react-hook-form';
import NeedAuth from '@/components/NeedAuth';

export default async function AccountSettingsPage () {
    const user = await repository.getUserProfile();
    if (!user) {
        return <NeedAuth/>
    }

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
                            displayName: user.displayName,
                            description: user.description
                        }}
                    />
                </PanelInset>
            </Panel>
        </>
    );
}
