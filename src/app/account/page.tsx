'use client';
import React, { useContext, useState } from 'react';
import { Panel, PanelInset } from '../components/Panel';
import { AuthContext } from '../../context/auth-context';
import Button from '../components/Button';
import { FaFloppyDisk } from 'react-icons/fa6';
import { updateProfile } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
    displayName: string;
}

export default function AccountSettingsPage () {
    const { user, reloadUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading, isDirty }
    } = useForm<IFormInput>();

    if (!user) {
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

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        if (user) {
            if (!data.displayName) {
                throw new Error('Must be a valid username');
            }
            await updateProfile(user, {
                displayName: data.displayName
            });
            reloadUser();
        }
    };

    return (
        <>
            <Panel title='Account Settings' className='medium-center'>
                <PanelInset>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col'
                    >
                        <div className='pb-3'>
                            <label htmlFor='displayName'>Display Name: </label>
                            <div className='mt-2 pr-4'>
                                <input
                                    {...register('displayName', {
                                        required: true
                                    })}
                                    className='f-input'
                                    type='text'
                                    defaultValue={user.displayName || ''}
                                    aria-invalid={
                                        errors.displayName ? 'true' : 'false'
                                    }
                                />
                                {errors.displayName?.type === 'required' && (
                                    <p role='alert' className='text-red-600'>
                                        *Display Name required!
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='self-end'>
                            <Button
                                type='submit'
                                green='right'
                                title='Save'
                                icon={<FaFloppyDisk />}
                                disabled={isLoading && isDirty}
                            />
                        </div>
                    </form>
                </PanelInset>
            </Panel>
        </>
    );
}
