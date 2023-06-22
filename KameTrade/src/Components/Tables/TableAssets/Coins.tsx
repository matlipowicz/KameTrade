import React, { useState, useEffect, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
    TableState,
} from "@tanstack/react-table";
import { Table, HStack, Input, Box } from "@chakra-ui/react";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import { TablePagination } from "src/components/Pagination/TablePagination";
import { RowSelector } from "src/components/Tables/RowSelector";
import { CoinColumns } from "src/components/Tables/ColumnsDef/CoinColumns";
import { TableSpinner } from "src/components/Tables/LoadingData/TableSpinner";
import { TableHead } from "src/components/Tables/TableElements/TableHead";
import { TableBody } from "src/components/Tables/TableElements/TableBody";
import { DebouncedInput } from "src/components/Tables/Filter/DebouncedInput";
import { filterFns } from "src/components/Tables/Filter/Filter";
// TODO: Understand the concept of implementation filter in below example

const { contains } = filterFns;

export const Coins = ({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: React.Dispatch<React.SetStateAction<string>> }) => {
    // const [globalFilter, setGlobalFilter] = useState("");
    const { data: coins, error, isLoading, isFetching } = useGetCoinsDataQuery(750);
    const coinsData = coins?.data.coins;

    const coinTable = useReactTable({
        columns: CoinColumns,
        data: coinsData!,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: contains,
    });

    const columnQuantity: number = coinTable.options.columns.length;
    return (
        <>
            <Box>
                <DebouncedInput value={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} placeholder="Enter token name" />

                <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                    <TableHead table={coinTable} />

                    {coinsData !== undefined ? <TableBody table={coinTable} /> : <TableSpinner columnQuantity={columnQuantity} />}
                </Table>
                {coinsData && (
                    <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem" w="100%">
                        <RowSelector table={coinTable} />
                        <TablePagination table={coinTable} data={coinsData} />
                    </HStack>
                )}
            </Box>
        </>
    );
};
