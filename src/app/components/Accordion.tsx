'use client';

import { PropsWithChildren, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { twJoin } from 'tailwind-merge';

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
    const { register, control } = useFormContext();
    const formatedValue = value.replace('.', '-');
    const watch = useWatch({ control, name: `${ignoreId}.${formatedValue}` });

    return (
        <div>
            <label className='checkbox-label'>
                <input
                    type='checkbox'
                    {...register(`${id}.${formatedValue}`, { disabled: watch })}
                    className={twJoin(watch && "opacity-0")}
                />
                <div
                    className={twJoin('checkbox', watch && 'disabled')}
                    title='Include Tag in search results.'
                />
                <div>
                    <span className={twJoin(watch && 'disabled-label')}>
                        {title}
                    </span>
                </div>
                <label className='disable-checkbox-label'>
                    <input
                        type='checkbox'
                        {...register(`${ignoreId}.${formatedValue}`)}
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
