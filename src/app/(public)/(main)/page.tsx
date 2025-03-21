import { BlueprintCardProps } from '@/components/BlueprintCard';
import SearchResult from '@/components/Search/SearchResult';
import repository from '@/repository';
import { notFound } from 'next/navigation';

type PageProps = {
    searchParams: Promise<{
        tags?: string | string[];
        ignoredTags?: string | string[];
        q?: string;
        page?: string;
    }>;
};

export default async function TabPage ({ searchParams }: PageProps) {
    const { tags, ignoredTags, page } = await searchParams;

    const {
        total,
        page: currentPage,
        totalPage,
        data
    } = await repository.getBlueprints({
        tags: typeof tags == 'string' ? [tags] : tags,
        ignoredTags:
            typeof ignoredTags == 'string' ? [ignoredTags] : ignoredTags,
        page: page ? Number(page) : undefined
    });
    try {
    } catch {
        notFound();
    }

    return (
        <SearchResult
            totalBlueprints={total}
            items={data as BlueprintCardProps[]}
            page={currentPage}
            totalPage={totalPage}
        />
    );
}
