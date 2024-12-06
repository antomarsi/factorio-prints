import { searchContentTiles } from '@/lib/api';
import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import BlueprintBookTable, {
    BlueprintDataType
} from '@/app/components/BlueprintBookTable';

const parseBlueprint = (v: any): BlueprintDataType => ({
    type: v.item,
    icons: v.icons,
    title: v.label,
    blueprints: v.blueprints?.map((b: any) => parseBlueprint(b))
});

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const id = (await params).id;
    const data = await searchContentTiles(id);
    const parsedData = data.map((v: any) => parseBlueprint(v));
    return (
        <>
            <Tabs items={tabs(id, 'blueprint')} />
            <PanelInset className='mb-0'>
                <div className='blueprint-page-info'>
                    <BlueprintBookTable defaultData={parsedData} />
                </div>
            </PanelInset>
        </>
    );
}
