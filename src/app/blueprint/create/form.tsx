'use client';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/app/components/Input/TextInput';
import TextAreaInput from '@/app/components/Input/TextAreaInput';
import Button from '@/app/components/Button';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ERROR_TYPE, imgurRegexValidation } from '@/lib/utils';

export interface IFormInput {
    title: string;
    description: string;
    blueprintString: string;
    tags: string[];
    imgUrl: string;
}

type CreateBlueprintFormProps = {
    defaultValues?: Partial<IFormInput>;
    onSubmit: (data:IFormInput) => any
};

export function CreateBlueprintForm ({
    defaultValues,
    onSubmit
}: CreateBlueprintFormProps) {
    const {
        setError,
        register,
        handleSubmit,
        watch,
        formState: { errors, isLoading, isDirty }
    } = useForm<IFormInput>({ defaultValues });

    return (
        <form onSubmit={handleSubmit(async data => {
            const response = await onSubmit(data)
            if (!response.success) {
                switch (response.type) {
                    case ERROR_TYPE.INVALID_BLUEPRINT:
                        setError("blueprintString", {type: "custom", message: "* Invalid blueprint"})
                        break;

                    case ERROR_TYPE.INVALID_IMGUR:
                        setError("imgUrl", {type: "custom", message: "* Invalid Imgur Link"})
                        break;
                    default:
                        alert("Something bad happened")
                        break;
                }
            }
        })} className='flex flex-col'>
            <div className='pb-3'>
                <label htmlFor='title'>
                    <h2 className='mb-0'>Title:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextInput
                        {...register('title', {
                            required: true
                        })}
                        className='w-full'
                        aria-invalid={errors.title ? 'true' : 'false'}
                        error={errors.title}
                        errorMessage={{
                            required: '* Title may not be empty'
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
                        {...register('description')}
                        placeholder='Description (plain text or *GitHub Flavored Markdown*)'
                        error={errors.description}
                        errorMessage={{
                            required: '* Description Markdown may not be empty'
                        }}
                    />
                </div>
            </div>
            <div className='pb-3'>
                <label
                    htmlFor='description'
                    className='flex flex-row items-center justify-between'
                >
                    <h2 className='mb-0'>Description Preview:</h2>
                </label>
                <div className='textarea disabled mt-2 pr-4 p-2'>
                    <div className='min-h-[200px] h-auto'>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {watch('description')}
                        </Markdown>
                    </div>
                </div>
            </div>
            <div className='pb-3'>
                <label
                    htmlFor='description'
                    className='flex flex-row items-center justify-between'
                >
                    <h2 className='mb-0'>Blueprint String:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextAreaInput
                        {...register('blueprintString')}
                        placeholder='You can write your bio here'
                        error={errors.blueprintString}
                        errorMessage={{
                            required: '* Blueprint String may not be empty'
                        }}
                    />
                </div>
            </div>
            <div className='pb-3'>
                <label htmlFor='imgUrl'>
                    <h2 className='mb-0'>Imgur URL:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextInput
                        {...register('imgUrl', {
                            required: true,
                            pattern: imgurRegexValidation
                        })}
                        className='w-full'
                        placeholder='https://imgur.com/kRua41d'
                        aria-invalid={errors.imgUrl ? 'true' : 'false'}
                        error={errors.imgUrl}
                        errorMessage={{
                            required: '* Please add a Imgur URL',
                            pattern:
                                '* Please use a direct link to an image like https://imgur.com/{id} or https://i.imgur.com/{id}.{ext}'
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
