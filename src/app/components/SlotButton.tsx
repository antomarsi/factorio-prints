import Link, { LinkProps } from 'next/link';
import React from 'react';
import { twJoin } from 'tailwind-merge';

type SlotButtonProps = React.ComponentProps<'button'> & {
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
    href,
    className,
    disabled,
    ...props
}: SlotButtonProps) {
    if (!href) {
        return (
            <span
                className={twJoin(
                    'slot-button-inline',
                    className,
                    disabled && 'disabled'
                )}
                {...props}
            >
                {icon}
                {title}
            </span>
        );
    }
    if (inline) {
        return (
            <Link
                href={href}
                className={twJoin(
                    'slot-button-inline',
                    selected && 'selected',
                    className,
                    disabled && 'disabled'
                )}
            >
                {icon}
                {title}
            </Link>
        );
    }
    return (
        <Link
            href={href}
            className={twJoin('slot', className, disabled && 'disabled')}
            title={title}
        >
            <div className='slot-button'>{icon}</div>
        </Link>
    );
}
