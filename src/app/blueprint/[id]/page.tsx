import { format, formatDistance } from 'date-fns';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlueprintPageParams, tabs } from './layout';
import repository from '@/repository';
import { Tabs } from '@/app/components/tabs';
import { PanelInset } from '@/app/components/Panel';

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const blueprint = await repository.getBlueprint((await params).id);
    return (
        <>
            <Tabs items={tabs(blueprint.id)} />
            <PanelInset className='mb-0'>
                <div className='blueprint-page-info'>
                    <div className='flex'>
                        <dl className='panel-hole w-full'>
                            <dt>Author:</dt>
                            <dd>
                                <Link href={`/user/${blueprint.author.authorId}`}>
                                    {blueprint.author.displayName}
                                </Link>
                            </dd>
                            <dt>Created:</dt>
                            <dd title={format(new Date(blueprint.createdDate), 'P')}>
                                {formatDistance(blueprint.createdDate, new Date(), {
                                    addSuffix: true
                                })}
                            </dd>
                            <dt>Last update:</dt>
                            <dd title={format(new Date(blueprint.lastUpdatedDate), 'P')}>
                                {formatDistance(blueprint.lastUpdatedDate, new Date(), {
                                    addSuffix: true
                                })}
                            </dd>
                        </dl>
                        <dl className='panel-hole w-full'>
                            <dt>Favorites:</dt>
                            <dd>{blueprint.numberOfFavorites}</dd>
                            <dt>Map Version:</dt>
                            <dd>{blueprint.version}</dd>
                            <dt>Blueprint Type:</dt>
                            <dd>{blueprint.blueprintType}</dd>
                        </dl>
                    </div>
                    <article className='panel-hole-combined'>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {blueprint.descriptionMarkdown}
                        </Markdown>
                    </article>
                </div>
            </PanelInset>
        </>
    );
}
