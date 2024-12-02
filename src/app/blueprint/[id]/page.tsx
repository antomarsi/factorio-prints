import BlueprintCard from '@/app/components/BlueprintCard';
import { Panel, PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `
## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community
`;

export default function BlueprintPage () {
    const tabsItems = [
        { title: 'Entities' },
        { title: 'Recipes' },
        { title: 'Blueprint Titles' }
    ];
    return (
        <>
            <Panel>
                <BlueprintCard
                    author={{ name: 'BonnaRe', id: '1234' }}
                    category='content'
                    updated_at={new Date('2024-11-14T22:20:29.661054')}
                    description='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                    image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                    tags={['Cheats']}
                    title='Tortellini - Spidertron - huge grid (44x22)'
                    version='2.0'
                    favorites={123}
                    id=''
                    className='!p-3'
                />

                <PanelInset className='mb-0'>
                    <div className='blueprint-page-info'>
                        <div className='flex'>
                            <dl className='panel-hole w-full'>
                                <dt>Author:</dt>
                                <dd>
                                    <Link href='/user/1234'>GreebFlag</Link>
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
                                <dd>0</dd>
                                <dt>Factorio version:</dt>
                                <dd>2.0.8.1</dd>
                                <dt>Type:</dt>
                                <dd>Blueprint book</dd>
                            </dl>
                        </div>
                        <article className='panel-hole-combined'>
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </Markdown>
                        </article>
                    </div>
                </PanelInset>
            </Panel>
        </>
    );
}
