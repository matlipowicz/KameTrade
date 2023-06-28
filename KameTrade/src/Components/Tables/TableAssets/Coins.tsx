import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Table, HStack, Input, Box } from "@chakra-ui/react";
import { TablePagination } from "src/Components/Pagination/TablePagination";
import { RowSelector } from "src/components/Tables/RowSelector";
import { CoinColumns } from "src/components/Tables/ColumnsDef/CoinColumns";
import { TableSpinner } from "src/components/Tables/LoadingData/TableSpinner";
import { TableHead } from "src/components/Tables/TableElements/TableHead";
import { TableBody } from "src/components/Tables/TableElements/TableBody";
import { filterFns } from "src/components/Tables/Filter/Filter";
import { useQuery } from "@tanstack/react-query";
import { coinsData } from "src/api/crypto";
// TODO: Understand the concept of implementation filter in below example

const { contains } = filterFns;

export const Coins = ({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: React.Dispatch<React.SetStateAction<string>> }) => {
    const {
        data: coinsTable,
        isLoading: coinsTableLoading,
        error: coinsTableError,
    } = useQuery({
        queryKey: ["coins", { limit: 750 }],
        queryFn: () => coinsData(750),
    });

    const coinsDataResponse = coinsTable?.data?.coins;

    const coinTable = useReactTable({
        columns: CoinColumns,
        data: coinsDataResponse!,
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

    if (coinsTableError) {
        return <div>{`Error:${coinsTableError}`}</div>;
    }

    const columnQuantity: number = coinTable.options.columns.length;
    return (
        <>
            <Box>
                <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                    <TableHead table={coinTable} />

                    {!coinsTableLoading ? <TableBody table={coinTable} /> : <TableSpinner columnQuantity={columnQuantity} />}
                </Table>
                {coinsDataResponse && (
                    <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem" w="100%">
                        <RowSelector table={coinTable} />
                        <TablePagination table={coinTable} data={coinsDataResponse} />
                    </HStack>
                )}
            </Box>
        </>
    );
};
