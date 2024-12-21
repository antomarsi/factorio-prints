import BlueprintCard from '@/app/components/BlueprintCard';
import Button from '@/app/components/Button';
import LikeButton from '@/app/components/Button/LikeButton';
import { Panel } from '@/app/components/Panel';
import { searchBlueprint } from '@/lib/api';
import { PropsWithChildren } from 'react';
import { FaDownload } from 'react-icons/fa6';

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
        },
        {
            title: 'Changelog',
            href: `/blueprint/${id}/changelog`,
            active: tab == 'changelog'
        },
        {
            title: 'Discussion',
            href: `/blueprint/${id}/discussion`,
            active: tab == 'discussion'
        }
    ];
};

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
                button={
                    <div className='flex flex-row gap-2'>
                        <div className='block'>
                        <LikeButton />
                        </div>
                        <div>
                            <Button green className='!justify-center gap-2'>
                                <FaDownload />
                                Copy to Clipboard
                            </Button>
                        </div>
                    </div>
                }
            />
            {children}
        </Panel>
    );
}
