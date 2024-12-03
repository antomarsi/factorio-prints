'use client';

import {
    FaClockRotateLeft,
    FaMagnifyingGlass,
    FaTrophy
} from 'react-icons/fa6';
import { twJoin } from 'tailwind-merge';

type TabsProps = React.PropsWithChildren & {
    items: { title: string; icon?: React.ReactNode; active?: boolean }[];
    header?: boolean;
};

function Tabs ({ children, items, header }: TabsProps) {
    return (
        <div>
            <ul
                className={twJoin(
                    'tabs',
                    header && 'tabs-for-panel tabs-header justify-end'
                )}
            >
                {items.map((v, i) => (
                    <li key={i}>
                        <a
                            className={twJoin(
                                v.active && 'active',
                                header && (v.active ? 'flex' : 'flex flex-row')
                            )}
                        >
                            {v.icon}
                            {v.title}
                        </a>
                    </li>
                ))}
            </ul>
            <div>{children}</div>
        </div>
    );
}

export { Tabs };
