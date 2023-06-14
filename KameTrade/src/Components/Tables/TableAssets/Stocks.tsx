import { useGetStockListQuery, useGetStockLastQuoteQuery } from "src/redux/store/slices/stockTwelve";
import { useGetStockTotalPriceQuery } from "src/redux/store/slices/stockYahoo";
import { useSelector } from "react-redux";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { StockBody } from "../TableBody/stockBody";
import { StockColumns } from "../ColumnsDef/stockColumns";
import { Box, Thead, Tbody, Table, Tr, Td, Th, HStack, chakra } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { flexRender } from "@tanstack/react-table";
import { RootState } from "src/redux/store/rootStore";
import { RowSelector } from "../RowSelector";
import TablePagination from "src/Components/Pagination/TablePagination";

export const Stocks = () => {
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
        data: stockListData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    const columnQuantity: number = stockTable.options.columns.length;
    return (
        <>
            <Box w="100%">
                <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)">
                    <Thead position="relative">
                        {stockTable.getHeaderGroups().map((headerGroup) => {
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

                    <StockBody stockListData={stockListData} table={stockTable} columnQuantity={columnQuantity} />
                </Table>

                {stockListData && (
                    <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem" w="100%">
                        <RowSelector table={stockTable} />
                        <TablePagination table={stockTable} data={stockListData} />
                    </HStack>
                )}
            </Box>
        </>
    );
};
