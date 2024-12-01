'use client';

import { PropsWithChildren, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

type AccordionProps = {
    title: string;
};

type AccordionItemProps = {
    title: string;
    value: string;
    id: string;
    ignoreId: string;
};

export function AccordionItem ({
    title,
    id,
    value,
    ignoreId
}: AccordionItemProps) {
    const { register } = useFormContext();
    return (
        <div>
            <label className='checkbox-label'>
                <input type='checkbox' {...register(id)} value={value} />
                <div
                    className='checkbox'
                    title='Include Tag in search results.'
                />
                <div>
                    <span>{title}</span>
                </div>
                <label className='disable-checkbox-label'>
                    <input
                        type='checkbox'
                        {...register(ignoreId)}
                        value={value}
                    />
                </label>
            </label>
        </div>
    );
}

export default function Accordion ({
    title,
    children
}: PropsWithChildren<AccordionProps>) {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => setOpen(v => !v);
    return (
        <div className='pb-2 ml-2'>
            <a
                className='flex flex-row text-primary w-full cursor-pointer hover:no-underline hover:text-primary'
                onClick={() => setOpen(!open)}
            >
                <label
                    htmlFor='expandCollpase'
                    className='font-bold uppercase cursor-pointer'
                >
                    {open ? <FaAngleDown size={18} /> : <FaAngleUp size={18} />}{' '}
                    {title}
                </label>
            </a>
            <div
                className={`ml-2 overflow-hidden transition-[max-height] duration-300 ${
                    open ? 'max-h-[1000px]' : 'max-h-0'
                }`}
            >
                {children}
            </div>
        </div>
    );
}
