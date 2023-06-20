import { useGetStockListQuery, useGetStockLastQuoteQuery } from "src/redux/store/slices/stockTwelve";
import { useGetStockTotalPriceQuery } from "src/redux/store/slices/stockYahoo";
import { useSelector } from "react-redux";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { Box, Table, HStack } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { flexRender } from "@tanstack/react-table";
import { RootState } from "src/redux/store/rootStore";
import { RowSelector } from "src/components/Tables/RowSelector";
import { TablePagination } from "src/components/Pagination/TablePagination";
import { TableSpinner } from "src/components/Tables/LoadingData/TableSpinner";
import { TableHead } from "src/components/Tables/TableElements/TableHead";
import { TableBody } from "src/components/Tables/TableElements/TableBody";
import { StockColumns } from "src/components/Tables/ColumnsDef/StockColumns";

export const Stocks = (query: { query: string }) => {
    const { data: stocksList } = useGetStockListQuery();
    const { data: stockDetail } = useGetStockLastQuoteQuery({ symbol: "AAPL", interval: "1day" });
    const { data: stockStatistic } = useGetStockTotalPriceQuery("AAPL");
    const stockDetailData = stockDetail;
    const stockStatisticData = stockStatistic?.defaultKeyStatistics;
    const stockListData = stocksList?.data;

    let assetType = useSelector((state: RootState) => {
        return state.tabs.assetType;
    });
    const stockTable = useReactTable({
        columns: StockColumns,
        data: stockListData!,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    const columnQuantity: number = stockTable.options.columns.length;
    return (
        <>
            <Box w="100%">
                <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                    <TableHead table={stockTable} />

                    {stockListData !== undefined ? <TableBody table={stockTable} query={query} /> : <TableSpinner columnQuantity={columnQuantity} />}
                </Table>

                {stockListData && (
                    <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem">
                        <RowSelector table={stockTable} />
                        <TablePagination table={stockTable} data={stockListData} />
                    </HStack>
                )}
            </Box>
        </>
    );
};
