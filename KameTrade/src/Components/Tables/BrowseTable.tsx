import { useLayoutEffect, useState, useRef, useCallback } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, chakra, Image, Button, HStack, Select, TableContainer } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, SortingState, getSortedRowModel, getPaginationRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Coins } from "src/redux/sliceTypes";
import { createColumnHelper } from "@tanstack/react-table";
import TablePagination from "../Pagination/TablePagination";
import millify from "millify";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

const rowSelectionNumber: number[] = [10, 20, 30, 40, 50];

const columnHelper = createColumnHelper<Coins>();
const columns = [
    columnHelper.accessor("name", {
        header: () => <Text>Coin</Text>,
        cell: (info) => {
            return (
                <HStack display="flex" gap="3rem" minW="30rem">
                    <Box w="5rem" h="5rem">
                        <Image src={info.row.original.iconUrl} alt="Coin logo" maxH="100%" maxW="100%" />
                    </Box>
                    <Box display="flex" gap="3rem">
                        <RouterLink to={`/browse/${info.row.original.name.toLowerCase()}`}>
                            <Button minW="8rem" fontSize="1.4rem" bg="addition.700" _hover={{ bg: "addition.800" }} _focus={{ bg: "addition.800" }}>
                                {info.row.original.symbol}
                            </Button>
                        </RouterLink>
                        <Text>{info.row.original.name}</Text>
                    </Box>
                </HStack>
            );
        },
    }),

    columnHelper.accessor("rank", {
        cell: (info) => info.getValue(),
        header: () => "Rank",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("price", {
        cell: (info) => {
            const assetPrice = millify(parseFloat(info.getValue()), { precision: 4 });
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
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("change", {
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

export function DataTable({ data }: { data: Coins[] }) {
    const [scrollTop, setScrollTop] = useState(false);
    const tableRef = useRef<HTMLElement | null>(null);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // TODO: Scroll przy większej ilości wierszy + sticky header po scrollu (jak w TradingView)

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDir="column" p="3rem">
                <Box maxH="83.1rem" overflowY="scroll">
                    {data !== undefined ? (
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
                                                        <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
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
                <HStack display="flex" alignItems="center" justifyContent="space-between" w="100%" p="1rem 3rem 5rem" maxW="125rem">
                    <Box display="flex" gap="1.5rem">
                        <Text>Show</Text>
                        <Box>
                            <Select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                textAlign="center"
                                fontSize="1.4rem"
                                color="addition.200"
                                borderColor="addition.200"
                                _hover={{ borderColor: "addition.250" }}
                                focusBorderColor="addition.250"
                            >
                                {rowSelectionNumber.map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        <Text>rows per page</Text>
                    </Box>
                    <TablePagination table={table} data={data} />
                </HStack>
            </Box>
        </>
    );
}
