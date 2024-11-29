import Link, { LinkProps } from 'next/link';
import React from 'react';
import { twJoin } from 'tailwind-merge';

type SlotButtonProps = {
    inline?: boolean;
    selected?: boolean;
    icon?: React.ReactElement;
    title: string;
    href?: string;
};

export default function SlotButton ({
    inline,
    selected,
    icon,
    title,
    href
}: SlotButtonProps) {
    if (!href) {
        return (
            <span className='slot-button-inline'>
                {icon}
                {title}
            </span>
        );
    }
    if (inline) {
        return (
            <Link
                href={href}
                className={twJoin('slot-button-inline', selected && 'selected')}
            >
                {icon}
                {title}
            </Link>
        );
    }
    return (
        <Link href={href} className='slot' title={title}>
            <div className='slot-button'>{icon}</div>
        </Link>
    );
}
