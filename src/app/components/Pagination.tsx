'use client';
import { FaAngleLeft, FaAngleRight, FaEllipsis } from 'react-icons/fa6';
import Button from './Button';
import { useMemo } from 'react';
import { returnPaginationRange } from '@/utils/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const onCLick = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    const paginationValues = useMemo(() => {
        const values = returnPaginationRange(totalPage, page, limit, siblings);
        return values.map((v, i) => {
            return v === '...' ? (
                <div key={i} className='square-sm w-[30px] min-w-[30px]'>
                    <FaEllipsis size={24} />
                </div>
            ) : (
                <Button
                    key={i}
                    squareSm
                    type='button'
                    active={v == page}
                    onClick={() => onCLick(v as number)}
                >
                    {v.toString()}
                </Button>
            );
        });
    }, [page, totalPage, limit, 1]);

    return (
        <>
            <Button
                squareSm
                type='button'
                disabled={page <= 1}
                onClick={() => onCLick(page - 1)}
            >
                <FaAngleLeft size={24} fontWeight={'600'} />
            </Button>
            {paginationValues}
            <Button
                squareSm
                type='button'
                disabled={page >= totalPage}
                onClick={() => onCLick(page + 1)}
            >
                <FaAngleRight size={24} />
            </Button>
        </>
    );
}
