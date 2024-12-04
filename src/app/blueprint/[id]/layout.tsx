import BlueprintCard from '@/app/components/BlueprintCard';
import { Panel, PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import { searchBlueprint } from '@/lib/api';
import { PropsWithChildren } from 'react';

export type BlueprintPageParams = {
    params: Promise<any>;
    searchParams: Promise<any>;
};

export const tabs = (
    id: string,
    tab?: string
): { title: string; href: string; active?: boolean }[] => {
    return [
    {
        title: 'Information',
        href: `/blueprint/${id}`,
        active: tab == undefined
    },
    {
        title: 'Blueprint',
        href: `/blueprint/${id}/blueprint`,
        active: tab == 'blueprint'
    }
]};

export default async function Layout ({
    children,
    params
}: PropsWithChildren<BlueprintPageParams>) {
    const data = await searchBlueprint((await params).id);

    return (
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
            {children}
        </Panel>
    );
}
