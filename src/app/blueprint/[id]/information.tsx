import { IBlueprint } from '@/lib/api';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Information (data: IBlueprint) {
    return (
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
                    <dd>{data.favorites}</dd>
                    <dt>Factorio version:</dt>
                    <dd>{data.version}</dd>
                    <dt>Type:</dt>
                    <dd>{data.category}</dd>
                </dl>
            </div>
            <article className='panel-hole-combined'>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {data.description}
                </Markdown>
            </article>
        </div>
    );
}
