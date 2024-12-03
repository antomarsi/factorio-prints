import { ComponentProps, ReactNode } from 'react';

type TableProps = {
    headers: ReactNode[];
    rows: ReactNode[];
    rowProps: ComponentProps<'td'>[];
};

export default function Table ({ headers, rows, rowProps }: TableProps) {
    return (
        <table className='panel-hole'>
            <thead>
                <header>
                    <tr>
                        {headers.map(v => (
                            <th>{v}</th>
                        ))}
                    </tr>
                </header>
            </thead>
            <tbody>
                {rows.map((v, i) => (
                    <td
                        {...(typeof rowProps[i] === 'undefined'
                            ? rowProps[i]
                            : {})}
                    >
                        {v}
                    </td>
                ))}
            </tbody>
        </table>
    );
}
