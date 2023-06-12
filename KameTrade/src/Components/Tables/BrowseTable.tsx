import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/rootStore";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Table, Thead, Tr, Th, Box, chakra, HStack } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import TablePagination from "../Pagination/TablePagination";
import { AssetTabs } from "src/Components/Tables/AssetTabs";
import { RowSelector } from "src/Components/Tables/RowSelector";
import Stocks from "./TableAssets/Stocks";
import { CoinBody } from "./TableBody/coinBody";
import { CoinColumns } from "./ColumnsDef/coinColumns";

// TODO: errors + coinsData types + shrink size of code lines to smaller chunks
// TODO: Set type for coinsData

export function BrowseTable() {
    //! Fetched asset data (coin + stocks)
    const { data: coins, error, isLoading, isFetching } = useGetCoinsDataQuery(750);

    const coinsData = coins?.data.coins;

    let assetType = useSelector((state: RootState) => {
        return state.tabs.assetType;
    });
    const coinTable = useReactTable({
        columns: CoinColumns,
        data: coinsData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const columnQuantity: number = coinTable.options.columns.length;

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDir="column" p="8rem 12rem" as="section" position="relative">
                <Box alignSelf="start">
                    <AssetTabs />
                </Box>

                <Box w="100%">
                    {assetType === "coin-tab" ? (
                        <>
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

                                <CoinBody coinsData={coinsData} table={coinTable} columnQuantity={columnQuantity} />
                            </Table>
                            {coinsData && (
                                <HStack display="flex" alignItems="center" justifyContent="space-between" mt="3rem" w="100%">
                                    <RowSelector table={coinTable} />
                                    <TablePagination table={coinTable} data={coinsData} />
                                </HStack>
                            )}
                        </>
                    ) : (
                        (assetType = "stock-tab" ? <Stocks /> : (assetType = "commodity-tab" ? <div>Commodity</div> : <div>No data available</div>))
                    )}
                </Box>
            </Box>
        </>
    );
}
