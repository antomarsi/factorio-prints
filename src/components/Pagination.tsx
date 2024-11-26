'use client';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
    FaEllipsisH
} from 'react-icons/fa';
import Button from './Button';
import range from 'lodash.range';
import { useMemo } from 'react';
import { returnPaginationRange } from '@/utils/pagination';

interface PaginationProps {
    page: number;
    totalPage: number;
    limit: number;
    link: string;
    siblings?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPage,
    limit,
    siblings = 1,
    link
}) => {
    const paginationValues = useMemo(() => {
        const values = returnPaginationRange(totalPage, page, limit, siblings);
        return values.map(v => {
            return v === '...' ? (
                <div className='square-sm w-[30px] min-w-[30px]'>
                    <FaEllipsisH size={24} />
                </div>
            ) : (
                <Button squareSm title={v.toString()} active={v==page}/>
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
            <Button
                squareSm
                icon={<FaAngleLeft size={24} />}
                disabled={page == 1}
            />
            {paginationValues}
            <Button
                squareSm
                icon={<FaAngleDoubleRight size={24} />}
                disabled={page == totalPage}
            />

            <Button
                squareSm
                icon={<FaAngleRight size={24} />}
                disabled={page == totalPage}
            />
        </>
    );
};

export default Pagination;
