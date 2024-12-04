'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';

type TabsProps = React.PropsWithChildren & {
    items: {
        title: string;
        icon?: React.ReactNode;
        active?: boolean;
        href: string;
    }[];
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
                        <Link
                            href={v.href}
                            className={twJoin(
                                v.active && 'active',
                                header && (v.active ? 'flex' : 'flex flex-row')
                            )}
                        >
                            {v.icon}
                            {v.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div>{children}</div>
        </div>
    );
}

export { Tabs };
