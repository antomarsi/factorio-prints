'use client';

import {
    FaClockRotateLeft,
    FaMagnifyingGlass,
    FaTrophy
} from 'react-icons/fa6';

type TabsProps = React.PropsWithChildren & {
    items?: { title: string; icon?: React.ReactNode }[];
};

const tabs = [
    { title: 'Most Recent', icon: <FaClockRotateLeft /> },
    { title: 'Most Favorited', icon: <FaTrophy /> },
    { title: 'Advanced Search', icon: <FaMagnifyingGlass /> }
];

function Tabs ({ children, items = tabs }: TabsProps) {
    return (
        <div>
            <ul className='tabs tabs-for-panel tabs-header justify-end'>
                {items.map((v, i) => (
                    <li key={i}>
                        <a className={i == 2 ? 'active flex' : 'flex flex-row'}>
                            {v.icon}
                            {v.title}
                        </a>
                    </li>
                ))}
            </ul>
            <div>{children}</div>
        </div>
    );
}

export { Tabs };
