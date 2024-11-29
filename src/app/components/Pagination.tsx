'use client';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
    FaEllipsisH
} from 'react-icons/fa';
import Button from './Button';
import { useMemo } from 'react';
import { returnPaginationRange } from '@/utils/pagination';

interface PaginationProps {
    page: number;
    totalPage: number;
    limit: number;
    siblings?: number;
}

export default function Pagination ({
    page,
    totalPage,
    limit,
    siblings = 1
}: PaginationProps) {
    const paginationValues = useMemo(() => {
        const values = returnPaginationRange(totalPage, page, limit, siblings);
        return values.map((v, i) => {
            return v === '...' ? (
                <div key={i} className='square-sm w-[30px] min-w-[30px]'>
                    <FaEllipsisH size={24} />
                </div>
            ) : (
                <Button
                    key={i}
                    squareSm
                    title={v.toString()}
                    active={v == page}
                />
            );
        });
    }, [page, totalPage, limit]);

    return (
        <>
            <Button
                squareSm
                icon={<FaAngleDoubleLeft size={24} />}
                disabled={page == 1}
            />
            {paginationValues}
            <Button
                squareSm
                icon={<FaAngleDoubleRight size={24} />}
                disabled={page == totalPage}
            />
        </>
    );
}
