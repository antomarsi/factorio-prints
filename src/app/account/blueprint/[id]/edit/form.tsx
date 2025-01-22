'use client';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import TextInput from '@/app/components/Input/TextInput';
import TextAreaInput from '@/app/components/Input/TextAreaInput';
import Button from '@/app/components/Button';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    ERROR_TYPE,
    getBlueprintName,
    getImgurId,
    getImgurIdType
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { blueprintForm } from '@/schemas/blueprintForm';
import { z } from 'zod';
import { useMemo } from 'react';
import Blueprint from '@/lib/blueprint';
import { PanelInset } from '@/app/components/Panel';

export type IFormInput = z.infer<typeof blueprintForm>;

type UpdateBlueprintFormProps = {
    defaultValues?: Partial<IFormInput>;
    onSubmit: (data: IFormInput) => any;
    oldImg?: string;
};

export function UpdateBlueprintForm ({
    defaultValues,
    onSubmit,
    oldImg
}: UpdateBlueprintFormProps) {
    const {
        setError,
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState: { errors, isLoading, isDirty }
    } = useForm<IFormInput>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver(blueprintForm)
    });

    const watchBlueprintString = watch('blueprintString');
    const watchImgPreview = watch('imgUrl');
    const watchDescription = watch('description');

    const blueprintInfo = useMemo(() => {
        const fieldState = getFieldState('blueprintString');
        if (fieldState.invalid && !fieldState.isDirty) {
            return null;
        }
        const blueprint = new Blueprint(watchBlueprintString);
        return blueprint.validate() ? blueprint : null;
    }, [getFieldState('blueprintString')]);

    const imgurPreview = useMemo(() => {
        const fieldState = getFieldState('imgUrl');
        if (fieldState.invalid && !fieldState.isDirty) {
            return null;
        }
        try {
            return getImgurId(watchImgPreview);
        } catch (e) {
            return null;
        }
    }, [getFieldState('imgUrl')]);

    return (
        <form
            onSubmit={handleSubmit(async data => {
                const response = await onSubmit(data);
                if (!response.success) {
                    switch (response.type) {
                        case ERROR_TYPE.INVALID_BLUEPRINT:
                            setError('blueprintString', {
                                type: 'custom',
                                message: '* Invalid blueprint'
                            });
                            break;

                        case ERROR_TYPE.INVALID_IMGUR:
                            setError('imgUrl', {
                                type: 'custom',
                                message: '* Invalid Imgur Link'
                            });
                            break;
                        default:
                            alert('Something bad happened');
                            break;
                    }
                }
            })}
            className='flex flex-col'
        >
            <div className='pb-3'>
                <label htmlFor='title'>
                    <h2 className='mb-0'>Title:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextInput
                        {...register('title')}
                        className='w-full'
                        error={errors?.title}
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
                        error={errors?.description}
                    />
                </div>
            </div>
            {watchDescription && (
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
                                {watchDescription}
                            </Markdown>
                        </div>
                    </div>
                </div>
            )}
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
                        error={errors?.blueprintString}
                    />
                </div>
            </div>
            {blueprintInfo && (
                <div className='pb-3'>
                    <label htmlFor='blueprintInfo'>
                        <h2 className='mb-0'>Blueprint Info:</h2>
                    </label>
                    <div className='mt-2 pr-4'>
                        <PanelInset className='mb-0'>
                            <div className='blueprint-page-info'>
                                <div className='flex'>
                                    <dl className='panel-hole w-full'>
                                        <dt>Map Version:</dt>
                                        <dd>{blueprintInfo.versionString}</dd>
                                        <dt>Blueprint Type:</dt>
                                        <dd>
                                            {getBlueprintName(
                                                blueprintInfo.blueprintType!
                                            )}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </PanelInset>
                    </div>
                </div>
            )}
            {oldImg && (
                <div className='pb-3'>
                    <label htmlFor='imgUrl'>
                        <h2 className='mb-0'>Old Imgur preview:</h2>
                    </label>
                    <div className='mt-2 pr-4'>
                        <img src={oldImg}/>
                    </div>
                </div>
            )}
            <div className='pb-3'>
                <label htmlFor='imgUrl'>
                    <h2 className='mb-0'>Imgur URL:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <TextInput
                        {...register('imgUrl')}
                        className='w-full'
                        placeholder='https://imgur.com/kRua41d'
                        error={errors?.imgUrl}
                    />
                </div>
            </div>

            {watchImgPreview && imgurPreview && (
                <div className='pb-3'>
                    <label htmlFor='imgUrl'>
                        <h2 className='mb-0'>Imgur preview:</h2>
                    </label>
                    <div className='mt-2 pr-4'>
                        <blockquote
                            className='imgur-embed-pub'
                            lang='en'
                            data-id={imgurPreview}
                        />
                        <script async src='//s.imgur.com/min/embed.js'></script>
                    </div>
                </div>
            )}
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
