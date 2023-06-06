export type PaginationBtnProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    pageIndex: number;
};

export type PaginationHookProps = {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currPage: number;
};
