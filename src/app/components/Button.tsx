'use client';
import Link from 'next/link';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    squareSm?: boolean;
    green?: boolean | string;
    icon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    dropdownItem?: boolean;
    link?: string;
    active?: boolean;
}
export default function Button ({
    title,
    icon,
    afterIcon,
    green,
    active,
    link,
    className,
    squareSm,
    dropdownItem,
    onClick,
    ...props
}: React.PropsWithChildren<ButtonProps>) {
    let classes = ['button w-full flex justify-between'];
    if (!dropdownItem) {
        classes.push('items-center');
    }
    if (squareSm) {
        classes = ['button square-sm'];
    }
    if (green) {
        classes = [green == 'right' ? 'button-green-right' : 'button-green'];
        if (icon) {
            classes.push('flex justify-between');
        }
    }
    if (className) classes.push(className);

    if (props.disabled) {
        classes.push('disabled');
    }
    if (active) {
        classes.push('active');
    }

    if (link) {
        return (
            <Link href={link} className={classes.join(' ')}>
                {icon}
                {title}
                {afterIcon}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={classes.join(' ')} {...props}>
            {icon}
            {title}
            {afterIcon}
        </button>
    );
}
