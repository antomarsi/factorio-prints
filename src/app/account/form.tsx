'use client';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import Button from '../components/Button';
import TextAreaInput from '../components/Input/TextAreaInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../components/Input/TextInput';
import { kMaxLength } from 'buffer';

export interface IFormInput {
    displayName: string;
    description: string;
}

type AccountFormProps = {
    defaultValues?: Partial<IFormInput>;
};

export function AccountForm ({ defaultValues }: AccountFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading, isDirty }
    } = useForm<IFormInput>({ defaultValues });

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        if (!data.description) {
            throw new Error('Must be a valid username');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <div className='pb-3'>
                <label htmlFor='displayName'>
                    <h2 className='mb-0'>Display Name:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextInput
                        {...register('displayName', {
                            required: true
                        })}
                        className='w-1/2'
                        aria-invalid={errors.displayName ? 'true' : 'false'}
                        error={errors.displayName}
                        errorMessage={{
                            required: '*Display Name required!'
                        }}
                    />
                </div>
            </div>
            <div className='pb-3'>
                <label
                    htmlFor='description'
                    className='flex flex-row items-center justify-between'
                >
                    <h2 className='mb-0'>Description:</h2>
                    <a
                        href='https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'
                        target='_blank'
                    >
                        You can use Markdown for formatting
                    </a>
                </label>
                <div className='mt-2 pr-4'>
                    <TextAreaInput
                        {...register('description', { maxLength: 600 })}
                        placeholder='You can write your bio here'
                        aria-invalid={errors.description ? 'true' : 'false'}
                        maxLength={600}
                        error={errors.description}
                        errorMessage={{
                            maxLength: '* Max Lenght of 600 characters'
                        }}
                    />
                </div>
            </div>
            <div className='self-end'>
                <Button
                    type='submit'
                    green='right'
                    disabled={isLoading && isDirty}
                >
                    <FaRegFloppyDisk /> Save new bio
                </Button>
            </div>
        </form>
    );
}
