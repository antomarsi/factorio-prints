'use client';
import React from 'react';
import { twJoin } from 'tailwind-merge';

type PanelProps = React.ComponentProps<'div'> & {
    title?: string;
};

export function Panel ({
    title,
    children,
    className,
    ...props
}: React.PropsWithChildren<PanelProps>) {
    return (
        <div className={twJoin('panel', className)} {...props}>
            {title && (<h2>{title}</h2>)}
            {children}
        </div>
    );
}

type PannelInsetProps = React.ComponentProps<'div'> & {
    dark?: boolean;
};

export function PanelInset ({
    children,
    dark,
    className,
    ...props
}: React.PropsWithChildren<PannelInsetProps>) {
    return (
        <div
            className={twJoin(
                dark ? 'panel-inset' : 'panel-inset-lighter',
                className
            )} {...props}
        >
            {children}
        </div>
    );
}
