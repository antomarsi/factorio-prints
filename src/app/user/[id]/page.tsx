import { Panel } from '../../components/Panel';
import BlueprintCard from '@/app/components/BlueprintCard';
import UserCard from '@/app/components/UserCard';

type userParams = {
    id: string;
};

export default async function UserPage ({
    params
}: {
    params: Promise<userParams>;
}) {
    const { author, blueprints } = await searchUser((await params).id);

    return (
        <>
            <UserCard
                author={author.username}
                image={author.image}
                description={author.description}
            />
            <Panel className='pb-0' title={`Blueprints by ${author.username}`}>
                <div>
                    <BlueprintCard
                        author={{ displayName: 'BonnaRe', authorId: '' }}
                        blueprintType={data.blueprintType}
                        lastUpdatedDate={new Date('2024-11-14T22:20:29.661054')}
                        descriptionMarkdown='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                        image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                        tags={['Cheats']}
                        title='Tortellini - Spidertron - huge grid (44x22)'
                        version='2.0'
                        numberOfFavorites={123}
                        id=''
                        className='!p-3'
                    />
                    <BlueprintCard
                        author={{ displayName: 'BonnaRe', authorId: '' }}
                        blueprintType={data.blueprintType}
                        lastUpdatedDate={new Date('2024-11-14T22:20:29.661054')}
                        descriptionMarkdown='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                        image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                        tags={['Cheats']}
                        title='Tortellini - Spidertron - huge grid (44x22)'
                        version='2.0'
                        numberOfFavorites={123}
                        id=''
                        className='!p-3'
                    />
                </div>
            </Panel>
        </>
    );
}
