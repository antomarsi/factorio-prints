'use client';

import React from 'react';
import { PanelInset } from '../Panel';
import Link from 'next/link';
import { FaCog, FaCubes, FaEye, FaHeart, FaHistory } from 'react-icons/fa';
import { format, formatDistance } from 'date-fns';
import SlotButton from '../SlotButton';
import Button from '../Button';
import { twJoin } from 'tailwind-merge';
import Image from 'next/image';

type SearchItemProps = React.ComponentProps<'div'> & {
    image: string;
    title: string;
    author: {
        name: string;
        link: string;
    };
    description: string;
    updated_at: Date;
    version: string;
    tags: string[];
    category: string;
    favorites: number;
    link: string;
};

export default function SearchItem ({
    image,
    title,
    author,
    description,
    updated_at,
    version,
    tags,
    category,
    favorites,
    link,
    className,
    ...props
}: SearchItemProps) {
    return (
        <PanelInset className={twJoin(className, "!p-0 !m-0")} {...props}>
            <div className='flex z-[1]'>
                <PanelInset className='my-0 w-full mr-[2px]'>
                    <div className='flex'>
                        <div className='my-0 mr-3 shrink-0'>
                            <Link href={link} className='block'>
                                <PanelInset className='blueprint-thumbnail m-0 p-0'>
                                    <img
                                        src={image}
                                        alt={title}
                                        className='max-w-full w-full h-full'
                                    />
                                    <div className='shadow-overlay' />
                                </PanelInset>
                            </Link>
                        </div>
                        <div className='w-full'>
                            <h2 className='mb-0'>
                                <Link href={link} className='text-primary'>{title}</Link>
                            </h2>
                            <div>
                                {" by "}<Link href={author.link} className='font-bold text-orange'>{author.name}</Link>
                            </div>
                            <hr/>
                            <p className='whitespace-pre-line line-clamp-4'>
                                {description}
                            </p>
                        </div>
                    </div>
                </PanelInset>
                <PanelInset className='m-0 w-[256px]'>
                    <div className='!pb-2  flex items-center'>
                        <FaCubes size={20} className='mr-1'/> {category}
                    </div>
                    <div className='mod-card-info'>
                        <div className='pb-2 flex items-center' title={format(updated_at, "P")}>
                            <FaHistory size={20} className='mr-1'/>{formatDistance(updated_at, new Date(), {addSuffix: true})}
                        </div>
                        <div className='pb-2 flex items-center' title='Available for these Factorio versions'>
                            <FaCog size={20} className='mr-1'/> {version}
                        </div>
                        <div className='pb-2 flex items-center' title="Favorites">
                            <FaHeart size={20} className='mr-1'/>{favorites}
                        </div>
                    </div>
                </PanelInset>
            </div>
            <PanelInset dark className='m-0 w-full p-1'>
                <div className='flex justify-between blueprint-tag-view'>
                    <div className='flex flex-wrap blueprint-tags'>
                        {tags.map((v, i) => <SlotButton inline title={v} key={i}/>)}
                    </div>
                    <div className='text-right flex items-baseline justify-end blueprint-view-section mt-auto'>
                        <div className='mr-3'/>
                        <div className='mr-3' hx-disinherit="*"/>
                        <div className='btn blueprint-view-button btn-blueprint'>
                            <Button green title='View' icon={<FaEye/>} className='!justify-center gap-2'/>
                        </div>

                    </div>
                </div>
            </PanelInset>
        </PanelInset>
    );
}
