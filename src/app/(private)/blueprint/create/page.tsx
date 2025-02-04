import { Panel, PanelInset } from '@/components/Panel';
import { getCurrentUser } from '@/firebase/server';
import { CreateBlueprintForm } from './form';
import repository from '@/repository';
import NeedAuth from '@/components/NeedAuth';
import { z } from 'zod';
import { blueprintForm } from '@/schemas/blueprintForm';
import { createBlueprintResponse } from '@/repository/models';

export default async function CreatePage () {
    const user = await getCurrentUser();
    const tags = await repository.getTags();

    if (!user) {
        return <NeedAuth/>
    }
    const onSubmit = async (data: z.infer<typeof blueprintForm>): Promise<createBlueprintResponse> => {
        "use server";
        return await repository.createBlueprint(data);
    };

    return (
        <>
            <Panel title='Create a new Blueprint' className='medium-center'>
                <PanelInset>
                    <CreateBlueprintForm onSubmit={onSubmit} tags={tags} />
                </PanelInset>
            </Panel>
        </>
    );
}
