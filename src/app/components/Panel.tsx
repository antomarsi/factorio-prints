'use client';
import React from 'react';

type PanelProps = React.ComponentProps<'div'> & {
    title: string;
};

export function Panel ({
    title,
    children,
    className
}: React.PropsWithChildren<PanelProps>) {
    return (
        <div className={['panel', className].join(' ')}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export function PanelInset ({
    children,
    dark
}: React.PropsWithChildren<{ dark?: boolean }>) {
    return (
        <div className={dark ? 'panel-inset' : 'panel-inset-lighter'}>
            {children}
        </div>
    );
}
