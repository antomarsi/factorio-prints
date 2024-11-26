'use client';
import React from 'react';
import { Panel, PanelInset } from '../components/Panel';
import Button from '../components/Button';
import Select from 'react-select';
import Pagination from '@/app/components/Pagination';

export default function MostRecentPage () {
    return (
        <>
            <Panel title='Most Recent'>
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
            </Panel>
        </>
    );
}
