'use client';

import { PropsWithChildren, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaArrowDown, FaArrowUp } from 'react-icons/fa';

type AccordionProps = {
    title: string;
};

export function AccordionItem () {
    return (
        <div>
            <label className='checkbox-label'>
                <input type='checkbox' />
                <div
                    className='checkbox'
                    title='Include Tag in search results.'
                />
                <div>
                    <span>Content</span>
                </div>
                <label className='disable-checkbox-label'>
                    <input type='checkbox' />
                </label>
            </label>
        </div>
    );
}

export default function Accordion ({
    title,
    children
}: PropsWithChildren<AccordionProps>) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className='flex flex-row justify-between'>

            <label htmlFor='expandCollpase'>
                {title} {open ? <FaAngleDown /> : <FaAngleUp />}
            </label>
            </div>
            <div className={open ? 'block' : 'hidden'}>{children}</div>
        </div>
    );
}
