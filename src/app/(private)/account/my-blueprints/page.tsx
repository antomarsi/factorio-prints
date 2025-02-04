import React from 'react';
import { getCurrentUser } from '@/firebase/server';
import { redirect } from 'next/navigation';
import SearchPage, { SearchParams } from '@/app/search/page';
import NeedAuth from '@/components/NeedAuth';

export default async function MyBlueprintsPage ({ searchParams }: SearchParams) {
    const user = await getCurrentUser();
    if (!user) {
        return <NeedAuth/>
    }

    return (
        <SearchPage
            useTabs={false}
            advancedSearch={false}
            searchParams={searchParams}
            title='My Blueprints'
            userId={user.uid}
        />
    );
}
