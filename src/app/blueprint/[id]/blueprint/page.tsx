import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { useContext } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { searchBlueprint, searchContentTiles } from '@/lib/api';
import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import TreeTable from '@/app/components/TreeTable';

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const id = (await params).id;
    const data = await searchContentTiles(id);

    return (
        <>
            <Tabs items={tabs(id, 'blueprint')} />
            <PanelInset className='mb-0'>
                <div className='blueprint-page-info'>
                    <TreeTable
                        headers={['title']}
                        rows={data.map((v: any) => [v.label])}
                    />
                    {JSON.stringify(data)}
                </div>
            </PanelInset>
        </>
    );
}
