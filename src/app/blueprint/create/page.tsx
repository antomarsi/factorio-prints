import { Panel, PanelInset } from '@/app/components/Panel';
import { getCurrentUser } from '@/firebase/server';
import { CreateBlueprintForm, IFormInput } from './form';
import repository from '@/repository';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { blueprintForm } from '@/schemas/blueprintForm';

export default async function CreatePage () {
    const user = await getCurrentUser();

    if (!user) {
        redirect(`/user/refresh?redirect=/blueprint/create`)
    }

    const onSubmit = async (data: z.infer<typeof blueprintForm>) => {
        'use server';
        const result = await repository.createBlueprint(data);
        if (result.success) {
            redirect(`/blueprint/${result.id}`);
        }
        return result;
    };

    return (
        <>
            <Panel title='Create a new Blueprint' className='medium-center'>
                <PanelInset>
                    <CreateBlueprintForm onSubmit={onSubmit} />
                </PanelInset>
            </Panel>
        </>
    );
}
