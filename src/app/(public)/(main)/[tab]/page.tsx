import { BlueprintCardProps } from '@/components/BlueprintCard';
import SearchResult from '@/components/Search/SearchResult';
import repository from '@/repository';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{
        tab: string;
    }>;
    searchParams: Promise<{
        tags?: string | string[];
        ignoredTags?: string | string[];
        q?: string;
        page?: string;
    }>;
};

export default async function TabPage ({ params, searchParams }: PageProps) {
    const { tab } = await params;
    const { tags, ignoredTags, page } = await searchParams;


    if (['recent', 'favorited'].includes(tab)) {
        notFound()
    }

    const {
        total,
        page: currentPage,
        totalPage,
        data
    } = await repository.getBlueprints({
        tags: typeof tags == 'string' ? [tags] : tags,
        ignoredTags:
            typeof ignoredTags == 'string' ? [ignoredTags] : ignoredTags,
        sort: tab,
        page: page ? Number(page) : undefined
    });

    return (
        <SearchResult
            totalBlueprints={total}
            items={data as BlueprintCardProps[]}
            page={currentPage}
            totalPage={totalPage}
        />
    );
}
