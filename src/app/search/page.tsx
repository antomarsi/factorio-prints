'use client';
import React from 'react';
import { Tabs } from '../components/tabs/index';
import { Panel } from '../components/Panel';
import { FaHistory, FaSearch, FaTrophy } from 'react-icons/fa';

const tabItems = [
    { title: 'Recently updated', icon: <FaHistory /> },
    { title: 'Most Favorited', icon: <FaTrophy /> },
    { title: 'Advanced Search', icon: <FaSearch /> }
];

export default function MostRecentPage () {
    return (
        <>
            <Tabs items={tabItems} />
            <Panel title='Search'></Panel>
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
