'use client';
import {
    createColumnHelper,
    ExpandedState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable
} from '@tanstack/react-table';
import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import FactorioIcon from './FactorioIcon';
import { twJoin } from 'tailwind-merge';

export type BlueprintDataType = {
    type: string;
    icons?: any[];
    title: string;
    blueprints?: BlueprintDataType[];
};

type BlueprintBookTableProps = {
    defaultData: BlueprintDataType[];
};

const types = {
    blueprint: 'blueprint'
};

export default function BlueprintBookTable ({
    defaultData
}: BlueprintBookTableProps) {
    const columns = useMemo(() => {
        const columnHelper = createColumnHelper<BlueprintDataType>();
        const defaultColumns = [
            columnHelper.display({
                id: 'actions',
                header: 'Blueprints',
                cell: ({ row }) => {
                    return (
                        <div className={twJoin('flex flex-row gap-2', `ml-${row.depth*4}`)}>
                            {row.getCanExpand() ? (
                                <button
                                    {...{
                                        onClick: row.getToggleExpandedHandler()
                                    }}
                                >
                                    {row.getIsExpanded() ? (
                                        <FaAngleDown />
                                    ) : (
                                        <FaAngleRight />
                                    )}
                                </button>
                            ) : (
                                ''
                            )}
                            <FactorioIcon
                                alt={row.original.type}
                                iconName={row.original.type}
                            />
                            {row.original.icons?.map((v, i) => (
                                <FactorioIcon
                                    key={i}
                                    iconName={v.signal.name}
                                    iconType={v.signal.type}
                                    alt={v.signal.name}
                                />
                            ))}
                            <span>{row.original.title}</span>
                        </div>
                    );
                }
            })
        ];

        return defaultColumns;
    }, []);

    const [data, setData] = useState(defaultData);

    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        columns: columns,
        data: data,
        initialState: {
            expanded: true
        },
        state: {
            expanded
        },
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSubRows: row => row.blueprints
    });

    return (
        <table className='panel-hole'>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
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
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
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
                ))}
            </tbody>
        </table>
    );
}
