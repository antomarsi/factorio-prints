'use client';
import { FaSortAmountDown } from 'react-icons/fa';
import SlotButton from '../SlotButton';
import Pagination from '../Pagination';
import { PanelInset } from '../Panel';
import SearchItem from './SearchItem';

type SearchResultProps = {
    totalMods: number;
    advancedSearch?: boolean;
    limit?: number
    page: number
    totalPage: number
};

function TopSearchResult ({limit = 20, advancedSearch, totalMods, ...props}:SearchResultProps) {
    return <div className='flex flex-wrap justify-between mb-2 mt-3 gap-2 items-center'>
    <input type='text' className='hidden' name='sort_attribute' />
    {advancedSearch && (
        <div className='flex items-center gap-2'>
            <FaSortAmountDown />
            <SlotButton inline href='' title='Relevance' selected />
            <SlotButton inline href='' title='Most Recent' />
            <SlotButton inline href='' title='Most Favorited' />
        </div>
    )}
    <div className='text-[#a6a6a6]'>
        Found {totalMods} blueprints
    </div>
    <div className='text-right flex justify-end ml-auto'>
        <Pagination limit={limit} {...props}/>
    </div>
</div>
}

export default function SearchResult ({limit=20, ...props}: SearchResultProps) {

    return (
        <div id='explorer-mainbar' className='w-4/5'>
            <TopSearchResult limit={20} {...props}/>
            <div id='blueprint-list'>
                <SearchItem
                    author={{ name: 'BonnaRe', link: '' }}
                    category='content'
                    updated_at={new Date("2024-11-14T22:20:29.661054")}
                    description='Test only - Tortellini Edit...The spidertron is just a minor addition or so they said ... boy, were they wrong. Nearly unkillable, fast as hell and at least twice as deadly ... all hail mega-spidertron! (spidertron-on-ground-zero is just for the epic effect, it will get killed by a nuke)'
                    image='https://assets-mod.factorio.com/assets/1c80cddc6bb7173efe55260b99a45782a97e6eb6.thumb.png'
                    tags={['Cheats']}
                    title='Tortellini - Spidertron - huge grid (44x22)'
                    version='2.0'
                    favorites={123}
                    link=''
                />
            </div>
            <TopSearchResult limit={20} {...props} advancedSearch={false}/>
        </div>
    );
}
