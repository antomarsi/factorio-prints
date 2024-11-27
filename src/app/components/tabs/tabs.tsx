'use client';

type TabsProps = React.PropsWithChildren & {
    items: { title: string, icon?: React.ReactNode }[];
};

function Tabs ({ children, items }: TabsProps) {
    return (
        <div>
            <ul className='tabs tabs-for-panel tabs-header justify-end'>
                {items.map((v, i) => (
                    <li key={i}>
                        <a className={i == 2 ? "active flex" : "flex flex-row"}>{v.icon}{v.title}</a>
                    </li>
                ))}
            </ul>
            <div>{children}</div>
        </div>
    );
}

export { Tabs };
