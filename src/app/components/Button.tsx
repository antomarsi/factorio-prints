'use client';
import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

type ButtonProps = React.ComponentProps<'button'> & AnchorHTMLAttributes<'a'> &{
    title?: string;
    squareSm?: boolean;
    green?: boolean | string;
    icon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    dropdownItem?: boolean;
    link?: string;
    active?: boolean;
    onClick?: any;
};
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
    const classes = twJoin(
        green
            ? [
                  green == 'right' ? 'button-green-right' : 'button-green',
                  icon && 'flex justify-between'
              ]
            : squareSm
            ? 'button square-sm'
            : [
                  'button w-full flex justify-between',
                  !dropdownItem && 'items-center'
              ],
        className,
        props.disabled && 'disabled',
        active && 'active'
    );
    if (!link) {
        return (
            <button className={classes} onClick={onClick} {...props}>
                {icon}
                {title}
                {afterIcon}
            </button>
        );
    }
    return (
        <Link href={link} target={props.target} className='no-underline hover:no-underline'>
            <button className={classes} onClick={onClick} {...props}>
                {icon}
                {title}
                {afterIcon}
            </button>
        </Link>
    );
}
