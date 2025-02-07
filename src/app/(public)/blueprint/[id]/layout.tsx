import BlueprintCard from '@/components/BlueprintCard';
import Button from '@/components/Button';
import CopyToClipboard from '@/components/Button/CopyToClipboard';
import FavoriteButton from '@/components/Button/FavoriteButton';
import { Panel } from '@/components/Panel';
import repository from '@/repository';
import { PropsWithChildren, ReactNode } from 'react';
import { FaPen } from 'react-icons/fa6';

export type BlueprintPageParams = {
    params: Promise<any>;
    searchParams: Promise<any>;
};

export const tabs = (
    id: string,
    tab?: string
): { title: ReactNode; href: string; active?: boolean; id?: string }[] => {
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
    const data = await repository.getBlueprint((await params).id);
    if (!data) {
        return <>{children}</>;
    }

    return (
        <Panel>
            <BlueprintCard
                author={{
                    displayName: data.author.displayName,
                    authorId: data.author.authorId
                }}
                blueprintType={data.blueprintType}
                descriptionMarkdown={data.descriptionMarkdown}
                lastUpdatedDate={data.lastUpdatedDate}
                title={data.title}
                image={data.image}
                tags={data.tags}
                gameVersion={data.gameVersion}
                numberOfFavorites={data.numberOfFavorites}
                id={data.id}
                className='!p-3'
                button={
                    <div className='flex flex-row gap-2'>
                        {data.isOwner && (
                            <div className='block'>
                                <Button
                                    className='!justify-center gap-2'
                                    href={`/account/blueprint/${data.id}/edit`}
                                >
                                    <FaPen />
                                    Edit
                                </Button>
                            </div>
                        )}
                        {!data.isOwner && (
                            <div className='block'>
                                <FavoriteButton />
                            </div>
                        )}
                        <div>
                            <CopyToClipboard
                                blueprintString={data.blueprintString}
                            />
                        </div>
                    </div>
                }
            />
            {children}
        </Panel>
    );
}
