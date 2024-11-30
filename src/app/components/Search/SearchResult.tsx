'use client';
import { FaArrowDownWideShort } from 'react-icons/fa6';
import SlotButton from '../SlotButton';
import Pagination from '../Pagination';
import { useMemo } from 'react';
import range from 'lodash.range';
import BlueprintCard, { BlueprintCardProps, SkeletonBlueprintCard } from '../BlueprintCard';

type TopSearchResultProps = {
    totalMods: number;
    advancedSearch?: boolean;
    limit?: number;
    page: number;
    totalPage: number;
    disabled?: boolean
};

type SearchResultProps = {
    totalMods: number;
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
    totalMods,
    disabled,
    ...props
}: TopSearchResultProps) {
    return (
        <div className='flex flex-wrap justify-between mb-2 mt-3 gap-2 items-center'>
            <input type='text' className='hidden' name='sort_attribute' />
            {advancedSearch && (
                <div className='flex items-center gap-1'>
                    <FaArrowDownWideShort />
                    <SlotButton
                        inline
                        href=''
                        title='Relevance'
                        className='px-2'
                        disabled={disabled}
                    />
                    <SlotButton
                        inline
                        href=''
                        title='Most Recent'
                        className='px-2'
                        disabled={disabled}
                    />
                    <SlotButton
                        inline
                        href=''
                        title='Most Favorited'
                        className='px-2'
                        disabled={disabled}
                    />
                </div>
            )}
            <div className='text-[#a6a6a6]'>Found {totalMods} results</div>
            <div className='text-right flex justify-end ml-auto'>
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
        return items.map(v => <BlueprintCard {...v} />);
    }, [items]);

    return (
        <div id='explorer-mainbar' className='w-3/4'>
            <TopSearchResult limit={20} {...props} disabled={loading || items.length == 0}/>
            <div id='blueprint-list'>
                {loading ? loadingItems : resultItems}
            </div>
            {items.length > 0 && !loading && (
                <TopSearchResult limit={20} {...props} advancedSearch={false} />
            )}
        </div>
    );
}
