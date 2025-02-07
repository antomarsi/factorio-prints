import React, { Suspense } from 'react';
import { Tabs } from '@/components/tabs/index';
import { Panel } from '@/components/Panel';
import SearchResult from '@/components/Search/SearchResult';
import Search from '@/components/Search';
import { BlueprintCardProps } from '@/components/BlueprintCard';
import repository from '@/repository';
import {
    FaClockRotateLeft,
    FaMagnifyingGlass,
    FaTrophy
} from 'react-icons/fa6';

export type SearchParams = {
    searchParams: Promise<{
        searchTerm?: string;
        tags?: string[] | string;
        ignoredTags?: string[] | string;
        sort?: string;
        page?: string;
    }>;
};

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
        href: '/search',
        active: !sort
    }
];

type CustomParams = {
    userId?: string;
    advancedSearch?: boolean;
    sort?: string;
    favoritedBy?: string;
    useTabs?: boolean;
    title?: string;
};

export default async function SearchPage ({
    searchParams,
    advancedSearch = true,
    userId,
    favoritedBy,
    sort,
    useTabs = true,
    title = 'Search'
}: SearchParams & CustomParams) {
    const params = await searchParams;
    let tags: string[] | undefined = undefined;
    if (params.tags) {
        tags = typeof params.tags == 'string' ? [params.tags] : params.tags;
    }
    let ignoredTags: string[] | undefined = undefined;
    if (params.ignoredTags) {
        ignoredTags =
            typeof params.ignoredTags == 'string'
                ? [params.ignoredTags]
                : params.ignoredTags;
    }
    const { total, page, totalPage, data } = await repository.getBlueprints({
        ...params,
        tags,
        userId,
        ignoredTags,
        favoritedBy,
        sort: sort || params.sort,
        page: params.page ? Number(params.page) : undefined
    });

    return (
        <Suspense fallback={<></>}>
            {useTabs && <Tabs items={tabs(sort)} header />}
            <Panel title={title} className='pb-0'>
                <Search>
                    <SearchResult
                        totalBlueprints={total}
                        advancedSearch={advancedSearch}
                        items={data as BlueprintCardProps[]}
                        page={page}
                        totalPage={totalPage}
                    />
                </Search>
            </Panel>
        </Suspense>
    );
}
