"use client"
import React from 'react';

type PanelProps = React.ComponentProps<'div'> & {
    title: string;
};

export const Panel: React.FC<React.PropsWithChildren<PanelProps>> = ({
    title,
    children,
    className
}) => {
    return (
        <div className={['panel', className].join(' ')}>
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export const PanelInset: React.FC<
    React.PropsWithChildren<{ dark?: boolean }>
> = ({ children, dark }) => {
    return (
        <div className={dark ? 'panel-inset' : 'panel-inset-lighter'}>
            {children}
        </div>
    );
};
