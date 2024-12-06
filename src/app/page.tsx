import SearchPage, { SearchParams } from './search/page';

export default async function Page ({ searchParams }: SearchParams) {
    return <SearchPage advancedSearch={true} searchParams={searchParams} />;
}
