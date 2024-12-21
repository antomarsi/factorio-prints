'use client';
import { PropsWithChildren, ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import Button from './Button';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

interface DropdownProps {
    icon?: ReactNode;
    title: string;
    img?: string | null;
}

export default function Dropdown ({
    title,
    children,
    img,
    icon,
    ...props
}: PropsWithChildren<DropdownProps> & React.ComponentProps<'div'>) {
    return (
        <div className={twJoin('dropdown', props.className)}>
            <Button>
                {img ? (
                    <Image
                        width={24}
                        height={24}
                        src={img}
                        alt={title}
                        className='w-6 h-6 rounded-full border-[1px] border-gray-700 border-opacity-50 mr-2'
                    />
                ) : icon ? (
                    icon
                ) : undefined}
                {title}
                <FaChevronDown className='login-arrow' size={16} />
            </Button>
            <div className='submenu min-w-[150px]'>{children}</div>
        </div>
    );
}
