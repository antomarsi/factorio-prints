import React from 'react';
import { getCurrentUser } from '@/firebase/server';
import { redirect } from 'next/navigation';
import SearchPage, { SearchParams } from '@/app/search/page';

export default async function MyFavoritesPage ({ searchParams }: SearchParams) {
    const user = await getCurrentUser();
    if (!user) {
        redirect(`/user/refresh?redirect=/account/my-blueprints`);
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
