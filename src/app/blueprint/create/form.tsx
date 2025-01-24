'use client';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '@/app/components/Input/TextInput';
import TextAreaInput from '@/app/components/Input/TextAreaInput';
import Button from '@/app/components/Button';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ERROR_TYPE, getBlueprintName, getImgurId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { blueprintForm } from '@/schemas/blueprintForm';
import { z } from 'zod';
import { useCallback, useEffect, useMemo } from 'react';
import Blueprint from '@/lib/blueprint';
import { PanelInset } from '@/app/components/Panel';
import SelectInput from '@/app/components/Input/SelectInput';
import { debounce, difference, uniq } from 'lodash';

export type IFormInput = z.infer<typeof blueprintForm>;

type CreateBlueprintFormProps = {
    defaultValues?: Partial<IFormInput>;
    onSubmit: (data: IFormInput) => any;
    tags: Record<string, string[]>;
};

export function CreateBlueprintForm ({
    defaultValues,
    onSubmit,
    tags
}: CreateBlueprintFormProps) {
    const {
        setError,
        register,
        handleSubmit,
        watch,
        getFieldState,
        control,
        setValue,
        formState: {
            errors,
            isLoading,
            isDirty,
            defaultValues: defaultValueForm
        }
    } = useForm<IFormInput>({
        defaultValues: useMemo(() => {
            const localstorageBlueprint = localStorage.getItem(
                'factorio-blueprint-create-form'
            );
            if (localstorageBlueprint) {
                return JSON.parse(localstorageBlueprint);
            }
            return defaultValues;
        }, [defaultValues]),
        mode: 'onBlur',
        resolver: zodResolver(blueprintForm)
    });

    const watchEverything = watch();

    const watchTitle = watch('title');
    const watchBlueprintString = watch('blueprintString');
    const watchImgPreview = watch('imgUrl');
    const watchDescription = watch('description');
    const watchTags = watch('tags');

    const updateLocalStorage = useCallback(
        debounce((blueprintData: IFormInput) => {
            localStorage.setItem(
                'factorio-blueprint-create-form',
                JSON.stringify(blueprintData)
            );
        }, 3000),
        []
    );

    useEffect(() => {
        updateLocalStorage(watchEverything);
    }, [watchEverything]);

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

    const tagOptions = useMemo(() => {
        return Object.entries(tags).reduce<
            { label: string; options: string[] }[]
        >((acc, [key, values]) => {
            acc.push({
                label: key,
                options: values.map(v => `${key}/${v}`)
            });
            return acc;
        }, []);
    }, [tags]);

    const unusedTagSuggestions = useMemo(() => {
        if (blueprintInfo) {
            const allTagSuggestions =
                blueprintInfo.generateTagSuggestions(watchTitle);
            return difference(allTagSuggestions, watchTags);
        }
        return [];
    }, [blueprintInfo, watchTitle, watchTags]);
    console.log(watchTags);

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
                } else {
                    localStorage.removeItem('factorio-blueprint-create-form');
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
            {unusedTagSuggestions.length > 0 && (
                <div className='pb-3'>
                    <label htmlFor='tags'>
                        <h2 className='mb-0'>Tag Suggestions:</h2>
                    </label>
                    <div className='mt-2 pr-4 flex gap-2'>
                        {unusedTagSuggestions.map((v, k) => (
                            <Button
                                className='!w-auto'
                                onClick={() => {
                                    setValue('tags', [...watchTags, v]);
                                }}
                                key={k}
                            >
                                {v}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <div className='pb-3'>
                <label htmlFor='tags'>
                    <h2 className='mb-0'>Tags:</h2>
                </label>
                <div className='mt-2 pr-4'>
                    <Controller
                        name='tags'
                        control={control}
                        render={({ field }) => {
                            console.log(JSON.stringify(defaultValueForm));
                            return (
                                <SelectInput
                                    options={tagOptions}
                                    isMulti
                                    value={watchTags}
                                    defaultValue={defaultValueForm?.tags}
                                    isClearable
                                    placeholder='Select at least one tag...'
                                    onChange={value => field.onChange(value)}
                                    className='w-full'
                                />
                            );
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
