'use client';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation';
import { PropsWithChildren, useMemo, useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Panel, PanelInset } from '../Panel';
import { FaClockRotateLeft, FaMagnifyingGlass, FaSpinner, FaTrophy } from 'react-icons/fa6';
import { twJoin } from 'tailwind-merge';
import Button from '../Button';
import { Filters, useFilters } from '@/context/filter-context';
import Accordion, { AccordionItem } from '../Accordion';
import tags from '@/assets/tags.json';
import { Tabs } from '../tabs';

const tabs = (sort?: string) => [
    {
        title: 'Most Recent',
        icon: <FaClockRotateLeft />,
        href: '/recent',
        active: sort == 'recent'
    },
    {
        title: 'Most Favorited',
        icon: <FaTrophy />,
        href: '/favorited',
        active: sort == 'favorited'
    },
    {
        title: 'Advanced Search',
        icon: <FaMagnifyingGlass />,
        href: '/',
        active: !sort
    }
];

export default function Search ({ children, title }: PropsWithChildren<{title?: string}>) {
    const activeTab = useParams().tab as string
    const { filters, updateFilters } = useFilters();
    const methods = useForm<Filters>({
        defaultValues: filters
    });
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        register,
        formState: { isLoading }
    } = methods;

    const onSubmit: SubmitHandler<Filters> = async data => {
        startTransition(() => {
            updateFilters(data);
        });
    };

    
    return (
        <>
        
        <Tabs items={tabs(activeTab)} header />
        <Panel title={title || "Search"} className='pb-0'>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PanelInset
                    dark
                    className='flex p-1 flex-wrap items-center justify-between mb-0'
                >
                    <div className='flex flex-wrap items-center grow'>
                        <div className='shrink-0 grow'>
                            <input
                                {...register('q')}
                                placeholder='Search title...'
                                type='text'
                                className='f-input w-full'
                            />
                        </div>
                        <div className='mx-4'>
                            <FaSpinner
                                className={twJoin(
                                    'animate-spin',
                                    !isPending && 'opacity-0'
                                )}
                            />
                        </div>
                        <Button
                            green
                            type='submit'
                            className='!justify-center gap-2'
                        >
                            <FaMagnifyingGlass />
                            Search
                        </Button>
                    </div>
                </PanelInset>
                <div className='flex justify-evenly'>
                    <PanelInset
                        id='explorer-sidebar'
                        dark
                        className='mr-3 shrink-0  w-1/4'
                    >
                        <h2>Mods</h2>

                        <h2>Tags</h2>
                        {Object.entries(tags).map(([key, value]) => (
                            <Accordion title={key} key={key}>
                                {value.map(v => (
                                    <AccordionItem
                                        title={v}
                                        key={v}
                                        value={v}
                                        id='tags'
                                        ignoreId='ignoredTags'
                                    />
                                ))}
                            </Accordion>
                        ))}
                        <h2>Entities</h2>
                        <h2>Recipes</h2>
                        <h2>Versions</h2>
                        <h2>Blueprint type</h2>
                    </PanelInset>
                    {children}
                </div>
            </form>
        </FormProvider>
        </Panel>
        </>
    );
}
