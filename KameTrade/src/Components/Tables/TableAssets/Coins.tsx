import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/rootStore";
import { useState, useEffect, useMemo } from "react";

import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table, Thead, Tr, Th, Box, chakra, HStack, Input } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import TablePagination from "src/Components/Pagination/TablePagination";
import { RowSelector } from "src/Components/Tables/RowSelector";
import { CoinColumns } from "../ColumnsDef/coinColumns";
import { CoinBody } from "../TableBody/coinBody";
// import { rankItem } from "@tanstack/match-sorter-utils";

export const Coins = (query: string) => {
    const [testQuery, setTestQuery] = useState("");
    const { data: coins, error, isLoading, isFetching } = useGetCoinsDataQuery(750);
    const coinsData = coins?.data.coins;

    const coinTable = useReactTable({
        columns: CoinColumns,
        data: coinsData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    console.log(coinsData);
    const columnQuantity: number = coinTable.options.columns.length;
    return (
        <>
            {/* <DebouncedInput value={testQuery ?? ""} onChange={(value) => setTestQuery(value)} /> */}
            <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                <Thead position="relative">
                    {coinTable.getHeaderGroups().map((headerGroup) => {
                        return (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            fontSize="1.8rem"
                                            fontWeight={700}
                                            lineHeight="2rem"
                                            p="2.5rem "
                                            color="addition.600"
                                            bg={"addition.700"}
                                            _hover={{ bg: "addition.800", cursor: "pointer" }}
                                            position="sticky"
                                            top="13.4rem"
                                        >
                                            <HStack display="flex" justifyContent="space-between" alignItems="center">
                                                <Box w="fit-content">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}

                                                    <Box position="absolute" right="6" top="50%" transform="translate(0%,-50%)">
                                                        <chakra.span position="relative" bottom="0.2rem">
                                                            {header.column.getIsSorted() ? (
                                                                header.column.getIsSorted() === "desc" ? (
                                                                    <ArrowDownIcon color="addition.150" />
                                                                ) : (
                                                                    <ArrowUpIcon color="addition.150" />
                                                                )
                                                            ) : null}
                                                        </chakra.span>
                                                    </Box>
                                                </Box>
                                            </HStack>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Thead>

                <CoinBody coinsData={coinsData} table={coinTable} columnQuantity={columnQuantity} query={query} />
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

// // A debounced input react component
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
