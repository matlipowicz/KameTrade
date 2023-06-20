import { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table, HStack, Input } from "@chakra-ui/react";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import { TablePagination } from "src/components/Pagination/TablePagination";
import { RowSelector } from "src/components/Tables/RowSelector";
import { CoinColumns } from "src/components/Tables/ColumnsDef/CoinColumns";
import { TableSpinner } from "src/components/Tables/LoadingData/TableSpinner";
import { TableHead } from "src/components/Tables/TableElements/TableHead";
import { TableBody } from "src/components/Tables/TableElements/TableBody";

// import { rankItem } from "@tanstack/match-sorter-utils";

export const Coins = (query: { query: string }) => {
    const [testQuery, setTestQuery] = useState("");
    const { data: coins, error, isLoading, isFetching } = useGetCoinsDataQuery(750);
    const coinsData = coins?.data.coins;

    const coinTable = useReactTable({
        columns: CoinColumns,
        data: coinsData!,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const columnQuantity: number = coinTable.options.columns.length;
    return (
        <>
            <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                <TableHead table={coinTable} />

                {coinsData !== undefined ? <TableBody table={coinTable} query={query} /> : <TableSpinner columnQuantity={columnQuantity} />}
            </Table>
            {coinsData && (
                <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem" w="100%">
                    <RowSelector table={coinTable} />
                    <TablePagination table={coinTable} data={coinsData} />
                </HStack>
            )}
        </>
    );
};

//! Tanstack table - filter

// function testFilter(row, columnId, value, addMeta) {
//     // Rank the item
//     const itemRank = rankItem(row.getValue(columnId), value);

//     // Store the itemRank info
//     addMeta({
//         itemRank,
//     });

//     // Return if the item should be filtered in/out
//     return itemRank.passed;
// }

// A debounced input react component
// function DebouncedInput({
//     value: initialValue,
//     onChange,
//     debounce = 500,
//     ...props
// }: {
//     value: string;
//     onChange: (value: string) => void;
//     debounce?: number;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
//     const [value, setValue] = useState(initialValue);

//     useEffect(() => {
//         setValue(initialValue);
//     }, [initialValue]);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             onChange(value);
//         }, debounce);

//         return () => clearTimeout(timeout);
//     }, [value]);

//     return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} bg="black" color="white" fontSize="1.6rem" />;
