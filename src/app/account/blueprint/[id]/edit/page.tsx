import { Panel, PanelInset } from '@/app/components/Panel';
import { getCurrentUser } from '@/firebase/server';
import repository from '@/repository';
import { redirect } from 'next/navigation';
import { BlueprintPageParams } from '@/app/blueprint/[id]/layout';
import NotFound from '@/app/not-found';
import { UpdateBlueprintForm } from './form';
import { z } from 'zod';
import { blueprintForm } from '@/schemas/blueprintForm';
import { getImgurId } from '@/lib/utils';

export default async function EditPage ({ params }: BlueprintPageParams) {
    const paramsData = await params;
    const user = await getCurrentUser();
    const blueprint = await repository.getBlueprint(paramsData.id);

    if (!blueprint) {
        return <NotFound />;
    }

    if (!user || blueprint.author.authorId != user.uid) {
        return (
            <Panel title='Access denied' className='medium-center'>
                <PanelInset>
                    <p>You are not the author of this blueprint.</p>
                </PanelInset>
            </Panel>
        );
    }

    if (!user) {
        redirect(`/user/refresh?redirect=/blueprint/${paramsData.id}/edit`);
    }

    const onSubmit = async (data: z.infer<typeof blueprintForm>) => {
        'use server';
        const result = await repository.updateBlueprint(paramsData.id, data);
        if (result.success) {
            redirect(`/blueprint/${result.id}`);
        }
        return result;
    };

    return (
        <>
            <Panel title={`Editing Blueprint: ${blueprint.title}`} className='medium-center'>
                <PanelInset>
                    <UpdateBlueprintForm onSubmit={onSubmit} defaultValues={{
                        blueprintString: blueprint.blueprintString,
                        description:blueprint.descriptionMarkdown,
                        imgUrl: blueprint.imageUrl,
                        tags: blueprint.tags,
                        title: blueprint.title
                    }} oldImg={blueprint.image}/>
                </PanelInset>
            </Panel>
        </>
    );
}
