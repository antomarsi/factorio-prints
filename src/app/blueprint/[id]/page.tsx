import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { useContext } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlueprintPageParams, tabs } from './layout';
import { searchBlueprint } from '@/lib/api';
import { Tabs } from '@/app/components/tabs';
import { PanelInset } from '@/app/components/Panel';

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const blueprint = await searchBlueprint((await params).id);
    return (
        <>
            <Tabs items={tabs(blueprint.id)} />
            <PanelInset className='mb-0'>
                <div className='blueprint-page-info'>
                    <div className='flex'>
                        <dl className='panel-hole w-full'>
                            <dt>Author:</dt>
                            <dd>
                                <Link href={`/user/${blueprint.author.id}`}>
                                    {blueprint.author.name}
                                </Link>
                            </dd>
                            <dt>Created:</dt>
                            <dd>
                                {formatDistance(new Date(), new Date(), {
                                    addSuffix: true
                                })}
                            </dd>
                            <dt>Last update:</dt>
                            <dd>
                                {formatDistance(new Date(), new Date(), {
                                    addSuffix: true
                                })}
                            </dd>
                        </dl>
                        <dl className='panel-hole w-full'>
                            <dt>Favorites:</dt>
                            <dd>{blueprint.favorites}</dd>
                            <dt>Factorio version:</dt>
                            <dd>{blueprint.version}</dd>
                            <dt>Type:</dt>
                            <dd>{blueprint.category}</dd>
                        </dl>
                    </div>
                    <article className='panel-hole-combined'>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {blueprint.description}
                        </Markdown>
                    </article>
                </div>
            </PanelInset>
        </>
    );
}
