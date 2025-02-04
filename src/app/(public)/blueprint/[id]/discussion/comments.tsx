"use client"
import { disqusConfig } from '@/lib/disqusConfi';
import { DiscussionEmbed } from 'disqus-react';

export default function CommentSection ({ id }: { id: string }) {
    return (
        <DiscussionEmbed
            shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME as string}
            config={disqusConfig(id)}
        />
    );
}
