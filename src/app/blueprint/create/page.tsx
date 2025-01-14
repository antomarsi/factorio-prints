import { Panel, PanelInset } from '@/app/components/Panel';
import { auth } from '@/firebase/server';
import { DecodedIdToken } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { CreateBlueprintForm, IFormInput } from './form';
import repository from '@/repository';
import { redirect } from 'next/navigation';

export default async function CreatePage () {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('firebaseIdToken')?.value;

    if (!authToken || !auth) {
        return (
            <Panel title='Create a new Blueprint'>
                <PanelInset>
                    <p>
                        Please log in with Google or GitHub in order to create a
                        new blueprint
                    </p>
                </PanelInset>
            </Panel>
        );
    }
    let user: DecodedIdToken | null = null;
    try {
        user = await auth.verifyIdToken(authToken);
    } catch (error) {
        return (
            <Panel title='Create a new Blueprint'>
                <PanelInset>
                    <p>
                        Please log in with Google or GitHub in order to create a
                        new blueprint
                    </p>
                </PanelInset>
            </Panel>
        );
    }

    const onSubmit = async (data: IFormInput) => {
        'use server';
        const result = await repository.createBlueprint(data);
        if (result.success) {
            redirect(`/blueprint/${result.id}`)
        }
        return result
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
