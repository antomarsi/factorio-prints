'use client';
import { useParams } from 'next/navigation';
import { Panel, PanelInset } from '../../components/Panel';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SearchItem from '@/app/components/Search/SearchItem';

let markdown = `
## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community
`;

export default function UserPage () {
    const { userId } = useParams();
    console.log(userId);

    return (
        <>
            <Panel className='!py-0'>
                <div className='flex'>
                    <PanelInset
                        dark
                        className='p0 w-[192px] h-[192px] shrink-0 relative'
                    >
                        <img
                            src={'/imgs/no-avatar.png'}
                            title={userId?.toString()}
                        />
                        <div className='shadow-overlay' />
                    </PanelInset>
                    <div className='author-card-content p-4'>
                        <h2 className='author-card-title'>{userId}</h2>
                        <div className='profile-bio-display'>
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </Markdown>
                        </div>
                    </div>
                </div>
            </Panel>
            <Panel className='pb-0' title={`Blueprints by ${userId}`}>
                <div>
                    <SearchItem
                        author={{ name: 'BonnaRe', link: '' }}
                        category='content'
                        updated_at={new Date('2024-11-14T22:20:29.661054')}
                        description='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                        image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                        tags={['Cheats']}
                        title='Tortellini - Spidertron - huge grid (44x22)'
                        version='2.0'
                        favorites={123}
                        link=''
                        className='!p-3'
                    />
                    <SearchItem
                        author={{ name: 'BonnaRe', link: '' }}
                        category='content'
                        updated_at={new Date('2024-11-14T22:20:29.661054')}
                        description='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                        image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                        tags={['Cheats']}
                        title='Tortellini - Spidertron - huge grid (44x22)'
                        version='2.0'
                        favorites={123}
                        link=''
                        className='!p-3'
                    />
                </div>
            </Panel>
        </>
    );
}
