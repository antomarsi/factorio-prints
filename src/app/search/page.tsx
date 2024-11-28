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

const tabItems = [
    { title: 'Recently updated', icon: <FaHistory /> },
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
                        <h2>Sort Order</h2>
                        <h2>Mod</h2>
                        <h2>Tags</h2>
                        <h2>Entities</h2>
                        <h2>Recipes</h2>
                        <h2>Versions</h2>
                        <h2>Blueprint type</h2>
                    </PanelInset>

                    <div id='explorer-mainbar' className='w-4/5'>
                        <div className='flex flex-wrap justify-between mb-2 mt-3 gap-y-2'>
                            <input
                                type='text'
                                className='hidden'
                                name='sort_attribute'
                            />
                            <div>
                                <FaSortAmountDown />
                            </div>
                        </div>
                    </div>
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
