'use client';
import React, { MouseEventHandler } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Button from './Button';
import Image from 'next/image';

interface DropdownProps {
    icon?: React.ReactElement,
    title: string;
    img?: string | null;
}

export default function Dropdown ({ title, children, img }: React.PropsWithChildren<DropdownProps>) {
    return (
        <div className='dropdown'>
            <Button
                title={title}
                icon={
                    img && (
                        <Image
                            width={24}
                            height={24}
                            src={img}
                            alt={title}
                            className='w-6 h-6 rounded-full border-[1px] border-gray-700 border-opacity-50 mr-2'
                        />
                    )
                }
                afterIcon={<FaChevronDown className='login-arrow' size={16} />}
            />
            <div className='submenu'>
                {children}
            </div>
        </div>
    );
}
