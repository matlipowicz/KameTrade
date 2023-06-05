import { useMemo } from "react";
import { PaginationHookProps } from "./paginationTypes";

// Range counter
const rangeTest = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
};
//! Pagination hook --> move as separate component
//! ADAM WYTLUMACZY --> PAMIETAJ ADAM
export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currPage }: PaginationHookProps) =>
    useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 1;
        const leftSiblingIndex = Math.max(currPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currPage + siblingCount, totalPageCount);
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (totalPageNumbers >= totalPageCount) {
            return rangeTest(1, totalPageCount);
        }

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = rangeTest(1, leftItemCount);

            return [...leftRange, "...", totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = rangeTest(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = rangeTest(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currPage]);
