import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/components/Panel';
import { Tabs } from '@/components/tabs';
import repository from '@/repository';
import NotFound from '@/app/not-found';
import Blueprint from '@/lib/blueprint';

export default async function BlueprintPage ({ params }: BlueprintPageParams) {
    const id = (await params).id;
    const data = await repository.getBlueprintString(id);
    if (!data) {
        return <NotFound />;
    }
    let newData = new Blueprint(data.blueprintString)
    
    let blueprintTitles = newData.getBlueprintTitles()

    console.log(blueprintTitles)
    

    return (
        <>
            <Tabs items={tabs(id, 'blueprint')} />
            <PanelInset className='mb-0'>
                <div className='blueprint-page-info'>
                    <table className='panel-hole'>
                        <thead>
                            {/* {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </th>
                        ))}
                    </tr>
                ))} */}
                        </thead>
                        <tbody>
                            {/* {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))} */}
                        </tbody>
                    </table>
                </div>
            </PanelInset>
        </>
    );
}
