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

type SearchParams = {
    searchParams: Promise<{
        searchTerm?: string;
        tags?: string[] | string;
        ignoredTags?: string[] | string;
        sort?: string;
        page?: string;
    }>;
};

const tabs = [
    { title: 'Most Recent', icon: <FaClockRotateLeft /> },
    { title: 'Most Favorited', icon: <FaTrophy /> },
    { title: 'Advanced Search', icon: <FaMagnifyingGlass />, active: true }
];

export default async function MostRecentPage ({ searchParams }: SearchParams) {
    const { totalBlueprints, page, totalPage, items } = await searchBlueprints(
        await searchParams
    );

    return (
        <NuqsAdapter>
            <Tabs items={tabs} header />
            <Panel title='Search' className='pb-0'>
                <Search>
                    <SearchResult
                        totalBlueprints={totalBlueprints}
                        advancedSearch
                        items={items as BlueprintCardProps[]}
                        page={page}
                        totalPage={totalPage}
                    />
                </Search>
            </Panel>
        </NuqsAdapter>
    );
}
