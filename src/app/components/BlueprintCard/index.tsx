'use client';

import React from 'react';
import Link from 'next/link';
import {
    FaGear,
    FaCubes,
    FaEye,
    FaHeart,
    FaClockRotateLeft
} from 'react-icons/fa6';
import { format, formatDistance } from 'date-fns';
import { twJoin } from 'tailwind-merge';
import { PanelInset } from '../Panel';
import SlotButton from '../SlotButton';
import Button from '../Button';

export type BlueprintCardProps = {
    image: string;
    title: string;
    author: {
        name: string;
        id: string;
    };
    description: string;
    updated_at: Date;
    version: string;
    tags: string[];
    category: string;
    favorites: number;
    id: string;
};

export default function BlueprintCard ({
    image,
    title,
    author,
    description,
    updated_at,
    version,
    tags,
    category,
    favorites,
    id,
    className,
    ...props
}: BlueprintCardProps & React.ComponentProps<'div'>) {
    
    return (
        <PanelInset className={twJoin('p0 !m-0 !py-3', className)} {...props}>
            <div className='flex z-[1]'>
                <PanelInset className='!my-0 w-full mr-[2px]'>
                    <div className='flex'>
                        <div className='!my-0 mr-3 shrink-0'>
                            <Link href={`/blueprint/${id}`} className='block'>
                                <PanelInset className='blueprint-thumbnail p0 !mt-0'>
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
                                <Link href={`/blueprint/${id}`} className='text-primary'>
                                    {title}
                                </Link>
                            </h2>
                            <div>
                                {' by '}
                                <Link
                                    href={`user/${author.id}`}
                                    className='font-bold text-orange'
                                >
                                    {author.name}
                                </Link>
                            </div>
                            <hr />
                            <p className='line-clamp-4 whitespace-pre-line text-ellipsis'>
                                {description}
                            </p>
                        </div>
                    </div>
                </PanelInset>
                <PanelInset className='w-[256px] !m-0'>
                    <div className='!pb-2  flex items-center'>
                        <FaCubes size={20} className='mr-1' /> {category}
                    </div>
                    <div className='mod-card-info'>
                        <div
                            className='pb-2 flex items-center'
                            title={format(new Date(updated_at), 'P')}
                        >
                            <FaClockRotateLeft size={20} className='mr-1' />
                            {formatDistance(new Date(updated_at), new Date(), {
                                addSuffix: true
                            })}
                        </div>
                        <div
                            className='pb-2 flex items-center'
                            title='Available for these Factorio versions'
                        >
                            <FaGear size={20} className='mr-1' /> {version}
                        </div>
                        <div
                            className='pb-2 flex items-center'
                            title='Favorites'
                        >
                            <FaHeart size={20} className='mr-1' />
                            {favorites}
                        </div>
                    </div>
                </PanelInset>
            </div>
            <PanelInset dark className='!m-0 w-full p-1'>
                <div className='flex justify-between blueprint-tag-view'>
                    <div className='flex flex-wrap blueprint-tags max-w-[600px] gap-1'>
                        {tags.map((v, i) => (
                            <SlotButton inline title={v} key={i} />
                        ))}
                    </div>
                    <div className='text-right flex items-baseline justify-end blueprint-view-section mt-auto'>
                        <div className='mr-3' />
                        <div className='mr-3' hx-disinherit='*' />
                        <div className='btn blueprint-view-button btn-blueprint'>
                            <Button
                                green
                                title='View'
                                icon={<FaEye />}
                                className='!justify-center gap-2'
                            />
                        </div>
                    </div>
                </div>
            </PanelInset>
        </PanelInset>
    );
}



type SkeletonBlueprintCardProps = React.ComponentProps<'div'>;

export function SkeletonBlueprintCard ({
    className,
    ...props
}: SkeletonBlueprintCardProps) {
    return (
        <PanelInset className={twJoin("p0 !m-0 !py-3", className, "animate-pulse")} {...props}>
            <div className='flex z-[1]'>
                <PanelInset className='!my-0 w-full mr-[2px]'>
                    <div className='flex'>
                        <div className='!my-0 mr-3 shrink-0'>
                            <div className='block'>
                                <PanelInset className='blueprint-thumbnail p0 !mt-0'>
                                    <div className='max-w-full w-full h-full bg-zinc-800'/>
                                    <div className='shadow-overlay'/>
                                </PanelInset>
                            </div>
                        </div>
                        <div className='w-full'>
                            <h2 className='mb-0'>
                                <div className='h-5 w-full max-w-72 rounded bg-zinc-800'/>
                            </h2>
                            <div className='h-4 mt-1 w-full max-w-32 rounded bg-zinc-800'/>
                            <hr/>
                            <div className='h-full w-full max-h-[74px] rounded bg-zinc-800'/>
                        </div>
                    </div>
                </PanelInset>
                <PanelInset className='w-[256px] !m-0'>
                    <div className='!pb-2  flex items-center'>
                        <FaCubes size={20} className='mr-1'/> <div className='h-5 rounded bg-zinc-800 w-full'/>
                    </div>
                    <div className='mod-card-info'>
                        <div className='pb-2 flex items-center'>
                            <FaClockRotateLeft size={20} className='mr-1'/><div className='h-5 rounded bg-zinc-800 w-full'/>
                        </div>
                        <div className='pb-2 flex items-center'>
                            <FaGear size={20} className='mr-1'/><div className='h-5 rounded bg-zinc-800 w-full'/>
                        </div>
                        <div className='pb-2 flex items-center' title="Favorites">
                            <FaHeart size={20} className='mr-1'/><div className='h-5 rounded bg-zinc-800 w-full'/>
                        </div>
                    </div>
                </PanelInset>
            </div>
            <PanelInset dark className='!m-0 w-full p-1'>
                        <div className='h-9 rounded bg-zinc-800 w-full'/>
            </PanelInset>
        </PanelInset>
    );
}
