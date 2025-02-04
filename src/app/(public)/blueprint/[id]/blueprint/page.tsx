
import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/components/Panel';
import { Tabs } from '@/components/tabs';
import BlueprintBookTable, {
    BlueprintDataType
} from '@/components/BlueprintBookTable';
import repository from '@/repository';

const parseBlueprint = (v: any): BlueprintDataType => ({
    type: v.item,
    icons: v.icons,
    title: v.label,
    blueprints: v.blueprints?.map((b: any) => parseBlueprint(b))
});



export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const id = (await params).id;
    const data = await repository.getBlueprintContentTiles(id);
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
