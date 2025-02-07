import { Suspense } from 'react';
import SearchPage, { SearchParams } from '../search/page';

export default async function Page ({ searchParams }: SearchParams) {
    return (
        <Suspense>
        <SearchPage
            advancedSearch={false}
            searchParams={searchParams}
            sort='recent'
        />
        </Suspense>
    );
}
