'use client';
import React, { MouseEventHandler } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Button from './Button';

interface DropdownProps {
    icon?: React.ReactElement;
    title: string;
    items: {
        icon?: React.ReactElement;
        title: string;
        onClick?: MouseEventHandler<HTMLButtonElement>;
        link?: string;
    }[];
    img?: string | null;
}

export default function Dropdown ({ icon, title, items, img }: DropdownProps) {
    return (
        <div className='dropdown'>
            <Button
                title={title}
                icon={
                    img && (
                        <img
                            src={img}
                            className='w-6 h-6 rounded-full border-[1px] border-gray-700 border-opacity-50 mr-2'
                        />
                    )
                }
                afterIcon={<FaChevronDown className='login-arrow' size={16} />}
            />
            <div className='submenu'>
                {items.map((v, i) => (
                    <Button
                        title={v.title}
                        key={i}
                        icon={v.icon}
                        onClick={v.onClick}
                        link={v.link}
                    />
                ))}
            </div>
        </div>
    );
}
