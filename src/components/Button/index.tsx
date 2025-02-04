'use client';
import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

export type ButtonProps = React.ComponentProps<'button'> & AnchorHTMLAttributes<'a'> &{
    squareSm?: boolean;
    green?: boolean | string;
    dropdownItem?: boolean;
    active?: boolean;
    onClick?: any;
};

export default function Button ({
    green,
    active,
    href,
    className,
    squareSm,
    dropdownItem,
    onClick,
    children,
    ...props
}: React.PropsWithChildren<ButtonProps>) {
    const classes = twJoin(
        green
            ? [
                  green == 'right' ? 'button-green-right' : 'button-green',
              ]
            : squareSm
            ? 'button square-sm'
            : [
                  'button w-full flex justify-between',
                  !dropdownItem && 'items-center'
              ],
        className,
        props.disabled && 'disabled',
        active && 'active',
        'flex'
    );
    if (!href) {
        return (
            <button className={classes} onClick={onClick} {...props}>
                {children}
            </button>
        );
    }
    return (
        <Link href={href} target={props.target} className='no-underline hover:no-underline'>
            <button className={classes} onClick={onClick} {...props}>
                {children}
            </button>
        </Link>
    );
}
