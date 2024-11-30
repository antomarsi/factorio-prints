'use client';
import React from 'react';
import { Tabs } from '../components/tabs/index';
import { Panel, PanelInset } from '../components/Panel';
import {
    FaHistory,
    FaSearch,
    FaSortAmountDown,
    FaSpinner,
    FaTrophy
} from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import Accordion, { AccordionItem } from '../components/Accordion';
import SearchResult from '../components/Search/SearchResult';

const tabItems = [
    { title: 'Most Recent', icon: <FaHistory /> },
    { title: 'Most Favorited', icon: <FaTrophy /> },
    { title: 'Advanced Search', icon: <FaSearch /> }
];

export default function MostRecentPage () {
    return (
        <>
            <Tabs items={tabItems} />
            <Panel title='Search'>
                <PanelInset
                    dark
                    className='flex p-1 flex-wrap items-center justify-between mb-0'
                >
                    <div className='flex flex-wrap items-center grow'>
                        <div className='shrink-0 grow'>
                            <input
                                placeholder='Search title...'
                                type='text'
                                className='f-input w-full'
                            />
                        </div>
                        <div className='mx-4'>
                            <FaSpinner className='animate-spin opacity-0' />
                        </div>
                    </div>
                    <div className='text-right justify-end cursor-pointer p-2'>
                        <FaCircleInfo />
                    </div>
                </PanelInset>
                <div id='search-results' className='flex justify-evenly'>
                    <PanelInset
                        id='explorer-sidebar'
                        dark
                        className='mr-3 shrink-0  w-1/5'
                    >
                        <h2>Mod</h2>
                        <h2>Tags</h2>
                        <Accordion title='Belt'>
                            <AccordionItem />
                        </Accordion>
                        <h2>Entities</h2>
                        <h2>Recipes</h2>
                        <h2>Versions</h2>
                        <h2>Blueprint type</h2>
                    </PanelInset>

                    <SearchResult totalMods={247} advancedSearch page={1} totalPage={24} />
                    
                </div>
            </Panel>
            {/* <Panel title='Search'>
                <PanelInset dark>
                    <div>
                        <input
                            placeholder='Search title...'
                            type='text'
                            className='f-input'
                        />
                        <Select
                            options={[]}
                            isMulti
                            placeholder='Search Tags...'
                        />
                        <Button type='submit' green='right' title='Search' />
                    </div>
                    <div>
                        <Pagination
                            page={8}
                            totalPage={18}
                            limit={5}
                            link='this/is/test'
                        />
                    </div>
                </PanelInset>
            </Panel> */}
        </>
    );
}
