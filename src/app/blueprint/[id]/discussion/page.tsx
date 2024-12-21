import { DiscussionEmbed } from 'disqus-react';
import { BlueprintPageParams, tabs } from '../layout';
import { PanelInset } from '@/app/components/Panel';
import { Tabs } from '@/app/components/tabs';
import CommentSection from './comments';

export default async function BlueprintDiscussionPage ({
    params
}: BlueprintPageParams) {
    const id = (await params).id;

    return (
        <>
            <Tabs items={tabs(id as string, 'discussion')} />
            <PanelInset>
                <CommentSection id={id} />
            </PanelInset>
        </>
    );
}
