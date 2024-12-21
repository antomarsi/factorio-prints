import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import { searchBlueprintChangelog } from '@/lib/api';

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const id = (await params).id;
    const changelogs = await searchBlueprintChangelog(id);

    return (
        <>
            <Tabs items={tabs(id, 'changelog')} />
            <PanelInset className='mb-0'>
                <h2>Changelog</h2>
                {changelogs.map((v, i) => (
                    <pre key={i} className='panel-hole-combined'>
                        {v}
                    </pre>
                ))}
            </PanelInset>
        </>
    );
}
