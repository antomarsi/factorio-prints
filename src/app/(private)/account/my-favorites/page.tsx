import React from 'react';
import { getCurrentUser } from '@/firebase/server';
import { redirect } from 'next/navigation';
import SearchPage, { SearchParams } from '@/app/search/page';
import NeedAuth from '@/components/NeedAuth';

export default async function MyFavoritesPage ({ searchParams }: SearchParams) {
    const user = await getCurrentUser();
    if (!user) {
        return <NeedAuth/>
    }

    return (
        <SearchPage
            useTabs={false}
            advancedSearch={false}
            searchParams={searchParams}
            title='My Favorites'
            favoritedBy={user.uid}
        />
    );
}
