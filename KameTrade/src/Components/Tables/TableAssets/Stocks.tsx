import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { Box, Table, HStack } from "@chakra-ui/react";
import { getFilteredRowModel } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { RowSelector } from "src/components/Tables/RowSelector";
import { TablePagination } from "src/Components/Pagination/TablePagination";
import { TableSpinner } from "src/components/Tables/LoadingData/TableSpinner";
import { TableHead } from "src/components/Tables/TableElements/TableHead";
import { TableBody } from "src/components/Tables/TableElements/TableBody";
import { StockColumns } from "src/components/Tables/ColumnsDef/StockColumns";
import { filterFns } from "src/components/Tables/Filter/Filter";
import { twelveStockList, twelveStockLogo, twelveStockProfile, twelveLastQuote } from "src/api/stock";
import { yahooTotalPrice } from "src/api/stock";

// TODO: types for table props and data
const { contains } = filterFns;
export const Stocks = ({
    globalFilter,
    setGlobalFilter,
}: {
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { data: stocksList } = useQuery({
        queryKey: ["stocks", { exchange: "NASDAQ", format: "json" }],
        queryFn: twelveStockList,
    });
    const { data: stockDetail } = useQuery({
        queryKey: ["quote", { symbol: "AAPL", interval: "1day" }],
        queryFn: () => twelveLastQuote({ symbol: "AAPL", interval: "1day" }),
    });
    const { data: stockStatistic } = useQuery({
        queryKey: ["qu", { symbol: "AAPL" }],
        queryFn: () => yahooTotalPrice("AAPL"),
    });

    const stockDetailData = stockDetail;
    const stockStatisticData = stockStatistic?.defaultKeyStatistics;
    const stockListData = stocksList?.data;

    const stockTable = useReactTable({
        columns: StockColumns,
        data: stockListData!,
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
    const columnQuantity: number = stockTable.options.columns.length;

    return (
        <>
            <Box w="100%">
                <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                    <TableHead table={stockTable} />

                    {stockListData !== undefined ? <TableBody table={stockTable as any} /> : <TableSpinner columnQuantity={columnQuantity} />}
                </Table>

                {stockListData && (
                    <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem">
                        <RowSelector table={stockTable} />
                        <TablePagination table={stockTable} data={stockListData as any} />
                    </HStack>
                )}
            </Box>
        </>
    );
};
