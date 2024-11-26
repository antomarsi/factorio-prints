import range from "lodash.range";

export const returnPaginationRange = (
    totalPage: number,
    page: number,
    limit: number,
    siblings: number
) => {
    const totalPageNoInArray = 7 + siblings;
    if (totalPageNoInArray >= totalPage) {
        return range(1, totalPage + 1);
    }
    const LeftSiblingsIndex = Math.max(page - siblings, 1);
    const rightSiblingsIndex = Math.min(page + siblings, totalPage);

    const showLeftDots = LeftSiblingsIndex > 2;
    const showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblings;
        const leftRange = range(1, leftItemCount + 1);
        return [...leftRange, '...', totalPage];
    } else if (showLeftDots && !showRightDots) {
        const rightItemsCount = 3 + 2 * siblings;
        const rightRange = range(
            totalPage - rightItemsCount + 1,
            totalPage + 1
        );
        return [1, '...', ...rightRange];
    } else {
        const middleRange = range(LeftSiblingsIndex, rightSiblingsIndex + 1);
        return [1, '...', ...middleRange, '...', totalPage];
    }
};