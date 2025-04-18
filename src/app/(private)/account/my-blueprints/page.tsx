import { BlueprintCardProps } from '@/components/BlueprintCard';
import NeedAuth from '@/components/NeedAuth';
import SearchResult from '@/components/Search/SearchResult';
import { getCurrentUser } from '@/firebase/server';
import repository from '@/repository';

type PageProps = {
    searchParams: Promise<{
        tags?: string | string[];
        ignoredTags?: string | string[];
        q?: string;
        page?: string;
        sort?: string;
    }>;
};

export default async function TabPage ({ searchParams }: PageProps) {
    const user = await getCurrentUser();
    if (!user) {
        return <NeedAuth />;
    }

    const { tags, ignoredTags, page, sort } = await searchParams;

    const {
        total,
        page: currentPage,
        totalPage,
        data
    } = await repository.getBlueprints({
        tags: typeof tags == 'string' ? [tags] : tags,
        ignoredTags:
            typeof ignoredTags == 'string' ? [ignoredTags] : ignoredTags,
        sort: sort,
        userId: user.uid,
        page: page ? Number(page) : undefined
    });

    return (
        <SearchResult
            totalBlueprints={total}
            advancedSearch
            items={data as BlueprintCardProps[]}
            page={currentPage}
            totalPage={totalPage}
        />
    );
}
