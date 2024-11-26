'use client';
import React, { useContext, useState } from 'react';
import { Panel, PanelInset } from '../../components/Panel';
import { AuthContext } from '../../context/auth-context';
import Button from '../../components/Button';
import { FaSave } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
    displayName: string;
}

const AccountSettingsPage: React.FC = () => {
    const { user, reloadUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            await updateProfile(user, {
                displayName: data.displayName
            });
            reloadUser();
            setLoading(false);
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
                                icon={<FaSave />}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </PanelInset>
            </Panel>
        </>
    );
};

export default AccountSettingsPage;
