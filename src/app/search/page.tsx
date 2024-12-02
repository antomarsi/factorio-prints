import React from 'react';
import { Tabs } from '../components/tabs/index';
import { Panel } from '../components/Panel';
import SearchResult from '../components/Search/SearchResult';
import Search from '../components/Search';
import { searchBlueprints } from '@/lib/api';
import { BlueprintCardProps } from '../components/BlueprintCard';

type SearchParams = {
    searchParams: Promise<{
        searchTerm?: string;
        tags?: string[] | string;
        ignoredTags?: string[] | string;
        sort?: string;
        page?: string;
    }>;
};

export default async function MostRecentPage ({ searchParams }: SearchParams) {
    
    const {totalBlueprints, page, totalPage, items} = await searchBlueprints(await searchParams)
    return (
        <>
            <Tabs />
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
        </>
    );
}
