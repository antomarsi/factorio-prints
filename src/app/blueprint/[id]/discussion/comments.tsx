"use client"
import { DiscussionEmbed } from 'disqus-react';

export default function CommentSection ({ id }: { id: string }) {
    const disqusConfig = {
        url: `${process.env.NEXT_PUBLIC_DISQUS_HOSTNAME}/${id}`,
        identifier: id,
        title: id
    };
    return (
        <DiscussionEmbed
            shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME as string}
            config={disqusConfig}
        />
    );
}
