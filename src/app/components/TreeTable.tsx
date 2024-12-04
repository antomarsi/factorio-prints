import { ComponentProps, ReactNode } from 'react';

type TableProps = {
    headers: ReactNode[];
    rows: ReactNode[][];
    rowProps?: ComponentProps<'td'>[];
};

export default function TreeTable ({ headers, rows, rowProps }: TableProps) {
    return (
        <table className='panel-hole'>
            <thead>
                <header>
                    <tr>
                        {headers.map((v, i) => (
                            <th key={i}>{v}</th>
                        ))}
                    </tr>
                </header>
            </thead>
            <tbody>
                {rows.map((v, i) => (
                    <tr key={`row-${i}`}>
                        {v.map((t, x) => (
                            <td
                                key={`col-${x}`}
                                {...(typeof rowProps != 'undefined' &&
                                typeof rowProps[x] != 'undefined'
                                    ? rowProps[x]
                                    : {})}
                            >
                                {t}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
