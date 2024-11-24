import React from "react";

export const Panel: React.FC<React.PropsWithChildren<{ title: string }>> = ({
    title,
    children,
}) => {
    return (
        <div className="panel">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export const PanelInset: React.FC<
    React.PropsWithChildren<{ dark?: boolean }>
> = ({ children, dark }) => {
    return (
        <div className={dark ? "panel-inset" : "panel-inset-lighter"}>
            {children}
        </div>
    );
};
