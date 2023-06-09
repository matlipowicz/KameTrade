import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, chakra, HStack } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

import { Commodity } from "src/redux/sliceTypes";
import { createColumnHelper } from "@tanstack/react-table";
import TablePagination from "../Pagination/TablePagination";
import millify from "millify";
import { RowSelector } from "src/Components/Tables/RowSelector";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

const columnHelper = createColumnHelper<any>();
const columns = [
    columnHelper.accessor("name", {
        header: () => <Text>Symbol</Text>,
        cell: (info) => {
            return (
                <HStack display="flex" gap="3rem" minW="30rem">
                    <Box w="10rem" h="5rem">
                        <Text>{info.getValue()}</Text>
                    </Box>
                </HStack>
            );
        },
    }),

    columnHelper.accessor("last", {
        cell: (info) => {
            const assetPrice = millify(parseFloat(info.getValue().replace(",", "")), { precision: 4 });

            return (
                <Text>
                    {assetPrice}{" "}
                    <chakra.span fontSize="1.2rem" color="addition.150">
                        USD
                    </chakra.span>
                </Text>
            );
        },
        header: () => "Value",
    }),
    columnHelper.accessor("changePercentage", {
        cell: (info) => {
            const change = parseFloat(info.getValue()).toFixed(2);
            const adjustColor = Number(change) > 0 ? <Text color="addition.200">+{change}%</Text> : <Text color="addition.400">{change}%</Text>;
            return adjustColor;
        },
        header: () => "Change (%)",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("24hVolume", {
        cell: (info) => {
            return (
                <Text>
                    {millify(parseFloat(info.getValue()), { precision: 3 })}{" "}
                    <chakra.span fontSize="1.2rem" color="addition.150">
                        USD
                    </chakra.span>
                </Text>
            );
        },
        header: () => "Volume 24h",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("marketCap", {
        cell: (info) => {
            return (
                <Text>
                    {millify(parseFloat(info.getValue()), { precision: 3 })}{" "}
                    <chakra.span fontSize="1.2rem" color="addition.150">
                        USD
                    </chakra.span>
                </Text>
            );
        },
        header: () => "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
];

export const CommodityTable = ({ commoditiesData }: { commoditiesData: Commodity[] }) => {
    const table = useReactTable({
        columns,
        data: commoditiesData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <>
            <Box maxH="83.1rem" overflowY="scroll">
                {commoditiesData !== undefined ? (
                    <Table
                        bg="rgba(0,0,0,0.16)"
                        backdropFilter="blur(1rem)"
                        height={"70rem"}
                        boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
                        maxW="130rem"
                        overflowY="scroll"
                    >
                        <Thead position="relative">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Th
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                fontSize="1.8rem"
                                                fontWeight={400}
                                                lineHeight="2rem"
                                                color="addition.600"
                                                p="2rem"
                                                _hover={{ backgroundColor: "background.500", cursor: "pointer" }}
                                                position="sticky"
                                                top="0"
                                            >
                                                <HStack display="flex" alignItems="center" justifyContent="space-between" gap="3rem">
                                                    <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                                                    <Box>
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
                                                </HStack>
                                            </Th>
                                        );
                                    })}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <Tr key={row.original.name} maxH="min-content" _hover={{ bg: "background.500" }}>
                                        {row.getVisibleCells().map((cell, index) => {
                                            return (
                                                <Td key={index} lineHeight="2rem" textAlign="center">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                ) : (
                    <Text>Data are not defined</Text>
                )}
            </Box>

            <HStack display="flex" alignItems="center" justifyContent="space-between" w="100%" mt="3rem" maxW="125rem">
                <RowSelector table={table} />
                <TablePagination table={table} data={commoditiesData} />
            </HStack>
        </>
    );
};
