'use client';
import { FaArrowDownWideShort, FaEye } from 'react-icons/fa6';
import SlotButton from '../SlotButton';
import Pagination from '../Pagination';
import { Suspense, useMemo } from 'react';
import range from 'lodash.range';
import BlueprintCard, {
    BlueprintCardProps,
    SkeletonBlueprintCard
} from '../BlueprintCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../Button';

type TopSearchResultProps = {
    totalBlueprints: number;
    advancedSearch?: boolean;
    limit?: number;
    page: number;
    totalPage: number;
    disabled?: boolean;
};

type SearchResultProps = {
    totalBlueprints: number;
    advancedSearch?: boolean;
    limit?: number;
    page: number;
    totalPage: number;
    loading?: boolean;
    items?: BlueprintCardProps[];
};

function TopSearchResult ({
    limit = 20,
    advancedSearch,
    totalBlueprints,
    disabled,
    ...props
}: TopSearchResultProps) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const onClick = (sort?: string) => {
        const params = new URLSearchParams(searchParams);
        if (sort) {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <div className='flex flex-wrap justify-between mb-2 mt-3 gap-2 items-center'>
            <input type='text' className='hidden' name='sort_attribute' />
            {advancedSearch && (
                <div className='flex items-center gap-1'>
                    <FaArrowDownWideShort />
                    <SlotButton
                        inline
                        title='Relevance'
                        className='px-2'
                        selected={!searchParams.get('sort')}
                        disabled={disabled}
                        onClick={() => onClick()}
                    />
                    <SlotButton
                        inline
                        title='Most Recent'
                        className='px-2'
                        disabled={disabled}
                        selected={searchParams.get('sort') == 'recent'}
                        onClick={() => onClick('recent')}
                    />
                    <SlotButton
                        inline
                        title='Most Favorited'
                        className='px-2'
                        selected={searchParams.get('sort') == 'favorited'}
                        disabled={disabled}
                        onClick={() => onClick('favorited')}
                    />
                </div>
            )}
            <div className='text-[#a6a6a6]'>
                Found {totalBlueprints} results
            </div>
            <div className='text-right flex justify-end ml-auto mr-3'>
                <Pagination limit={limit} {...props} />
            </div>
        </div>
    );
}

export default function SearchResult ({
    limit = 20,
    items = [],
    loading,
    ...props
}: SearchResultProps) {
    const loadingItems = useMemo(() => {
        return range(1, limit).map(v => <SkeletonBlueprintCard key={v} />);
    }, [limit]);

    const resultItems = useMemo(() => {
        return items.map(v => (
            <BlueprintCard
                author={v.author}
                blueprintType={v.blueprintType}
                id={v.id}
                image={v.image}
                numberOfFavorites={v.numberOfFavorites}
                lastUpdatedDate={v.lastUpdatedDate}
                tags={v.tags}
                title={v.title}
                version={v.version}
                descriptionMarkdown={v.descriptionMarkdown}
                key={v.id}
                button={
                    <Button
                        green
                        href={`/blueprint/${v.id}`}
                        className='!justify-center gap-2'
                    >
                        <FaEye /> View
                    </Button>
                }
            />
        ));
    }, [items]);
    const suspenseTopSearch = useMemo(() => {
        return (
            <TopSearchResult
                totalBlueprints={0}
                page={0}
                totalPage={0}
                disabled
            />
        );
    }, []);
    return (
        <div id='explorer-mainbar' className='w-3/4'>
            <Suspense fallback={suspenseTopSearch}>
                <TopSearchResult
                    {...props}
                    limit={20}
                    disabled={items.length == 0}
                />
            </Suspense>
            <div id='blueprint-list' className='mr-3'>
                <Suspense fallback={loadingItems}>{resultItems}</Suspense>
            </div>
            <Suspense>
                {items.length > 0 && (
                    <TopSearchResult
                        limit={20}
                        {...props}
                        advancedSearch={false}
                    />
                )}
            </Suspense>
        </div>
    );
}
