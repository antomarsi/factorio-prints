'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import SearchBar from './SearchBar';
import SearchSideBar from './SearchSidebar';
import SearchResult from './SearchResult';

export interface ISearchForm {
    searchTerm: string;
    tags: Record<string, boolean>;
    ignoredTags: Record<string, boolean>;
    sort: string;
    page: string;
}

export default function Search ({ children }: PropsWithChildren) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const methods = useForm<ISearchForm>({
        defaultValues: {
            sort: searchParams.get('sort')?.toString(),
            searchTerm: searchParams.get('searchTerm')?.toString(),
            tags: searchParams.getAll('tags').reduce((prev, curr) => {
                prev[curr] = true;
                return prev;
            }, {} as Record<string, boolean>),
            ignoredTags: searchParams
                .getAll('ignoredTags')
                .reduce((prev, curr) => {
                    prev[curr] = true;
                    return prev;
                }, {} as Record<string, boolean>),
            page: searchParams.get('page')?.toString()
        }
    });

    const onSubmit: SubmitHandler<ISearchForm> = async data => {
        console.log(data);
        const params = new URLSearchParams();
        data.sort ? params.set('sort', data.sort) : params.delete('sort');
        data.page ? params.set('page', data.page) : params.delete('page');
        data.searchTerm
            ? params.set('searchTerm', data.searchTerm)
            : params.delete('searchTerm');

        const ignoredTags = Object.entries(data.ignoredTags)
            .filter(([k, v]) => v)
            .map(([k, v]) => k);
        console.log(ignoredTags)

        ignoredTags.length > 0
            ? ignoredTags.forEach(v => params.append('ignoredTags', v))
            : params.delete('ignoredTags');

        const tags = Object.entries(data.tags)
            .filter(([k, v]) => v && !ignoredTags.includes(k))
            .map(([k, v]) => k);
        console.log(tags)

        tags.length > 0
            ? tags.forEach(v => params.append('tags', v))
            : params.delete('tags');

        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SearchBar />
                <div className='flex justify-evenly'>
                    <SearchSideBar />
                    {children}
                </div>
            </form>
        </FormProvider>
    );
}
