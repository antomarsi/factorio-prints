import React from 'react';
import { Tabs } from '../components/tabs/index';
import { Panel } from '../components/Panel';
import SearchResult from '../components/Search/SearchResult';
import Search from '../components/Search';
import { searchBlueprints } from '@/lib/api';
import { BlueprintCardProps } from '../components/BlueprintCard';
import { NuqsAdapter } from 'nuqs/adapters/next';
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
    advancedSearch?: boolean;
    sort?: string;
};

export default async function SearchPage ({
    searchParams,
    advancedSearch,
    sort
}: SearchParams & CustomParams) {
    const params = await searchParams;
    const { totalBlueprints, page, totalPage, items } = await searchBlueprints({
        ...params,
        sort: sort || params.sort
    });
    console.log(tabs(sort))

    return (
        <NuqsAdapter>
            <Tabs items={tabs(sort)} header />
            <Panel title='Search' className='pb-0'>
                <Search>
                    <SearchResult
                        totalBlueprints={totalBlueprints}
                        advancedSearch={advancedSearch}
                        items={items as BlueprintCardProps[]}
                        page={page}
                        totalPage={totalPage}
                    />
                </Search>
            </Panel>
        </NuqsAdapter>
    );
}
