'use client';

import React from 'react';
import { Panel, PanelInset } from './Panel';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type UserProps = {
    image?: string;
    author: string;
    description: string;
};

export default function UserCard ({ image, author, description }: UserProps) {
    return (
        <Panel className='!py-0'>
            <div className='flex'>
                <PanelInset
                    dark
                    className='p0 w-[192px] h-[192px] shrink-0 relative'
                >
                    <img src={image || '/imgs/no-avatar.png'} title={author} />
                    <div className='shadow-overlay' />
                </PanelInset>
                <div className='author-card-content p-4'>
                    <h2 className='author-card-title'>{author}</h2>
                    <div className='profile-bio-display'>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {description}
                        </Markdown>
                    </div>
                </div>
            </div>
        </Panel>
    );
}
