'use client';
import React, { useMemo } from 'react';
import { Tabs } from '../components/tabs/index';
import { Panel, PanelInset } from '../components/Panel';
import {
    FaClockRotateLeft,
    FaMagnifyingGlass,
    FaSpinner,
    FaTrophy,
    FaCircleInfo
} from 'react-icons/fa6';
import SearchResult from '../components/Search/SearchResult';
import SearchSideBar from '../components/Search/SearchSidebar';

export default function MostRecentPage () {
    return (
        <>
            <Tabs/>
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
                </PanelInset>
                <div className='flex justify-evenly'>
                    <SearchSideBar />
                    <SearchResult
                        totalMods={0}
                        advancedSearch
                        page={0}
                        totalPage={0}
                    />
                </div>
            </Panel>
        </>
    );
}
