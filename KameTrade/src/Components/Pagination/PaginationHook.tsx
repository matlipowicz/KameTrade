import { useMemo } from "react";
import { PaginationHookProps } from "./paginationTypes";

// Range counter
const rangeTest = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
};
//TODO: BUGFIX kropki przy powrocie na 1 stronnie znikaja
//TODO: Understand the concept of dots in pagination
const firstPageIndex = 1;
//! Pagination hook --> move as separate component
//! ADAM WYTLUMACZY --> PAMIETAJ ADAM
export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currPage }: PaginationHookProps) =>
    useMemo(() => {
        const totalPages = Math.ceil(totalCount / pageSize);
        //? Tutaj pagesCounter powinien byc suma siblingCount + firstPage + lastPage + currentPage, ale działa tak samo caly czas? Why?
        const leftSiblingIndex = Math.max(currPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currPage + siblingCount, totalPages);
        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPages - 2;

        if (siblingCount >= totalPages) {
            return rangeTest(1, totalPages);
        }

        if (!showLeftDots && showRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = rangeTest(1, leftItemCount);

            return [...leftRange, "...", totalPages];
        }

        if (showLeftDots && !showRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = rangeTest(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, "...", ...rightRange];
        }

        if (showLeftDots && showRightDots) {
            let middleRange = rangeTest(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "...", ...middleRange, "...", totalPages];
        }
    }, [totalCount, pageSize, siblingCount, currPage]);
