import BlueprintCard from '@/app/components/BlueprintCard';
import { Panel, PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import { searchBlueprint } from '@/lib/api';
import { formatDistance } from 'date-fns';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PageParams = {
    params: Promise<{
        id: string
    }>,    
    searchParams: Promise<{
       tab?: string
    }>;
}

const Information = dynamic(() => import("./information"))

export default async function BlueprintPage ({params, searchParams}: PageParams) {
    const data =  await searchBlueprint((await params).id)
    const page = await searchParams

    const tabs = [
        {title: "Information", active: true},
        {title: "Blueprint"}
    ]

    const content = () =>{
        if (!page.tab || page.tab == "information") {
            return <Information {...data}/>
        }
        switch (page.tab) {
            case "blueprint":
                return <>this is test</>
            default:
                return <Information {...data}/>
        }
    }


    return (
        <>
            <Panel>
                <BlueprintCard
                    author={{ name: data.author.name, id: data.author.id }}
                    category='content'
                    updated_at={new Date(data.updated_at)}
                    title={data.title}
                    description={data.description}
                    image={data.image}
                    tags={data.tags}
                    version={data.version}
                    favorites={data.favorites}
                    id={data.id}
                    className='!p-3'
                />
                <Tabs items={tabs}/>
                <PanelInset className='mb-0'>
                    {content()}
                </PanelInset>
            </Panel>
        </>
    );
}
