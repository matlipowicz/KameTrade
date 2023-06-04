// import { useState, useEffect, useRef } from "react";
// import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
// import { Coins } from "src/redux/sliceTypes";
// // import useStickyHeader from "./StickyHeader";
// import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Link } from "@chakra-ui/react";
// import { useReactTable, flexRender, getCoreRowModel, ColumnDef, SortingState, getSortedRowModel } from "@tanstack/react-table";
// import millify from "millify";

// const BrowseTable = () => {
//     const { data: coins, error, isLoading } = useGetCoinsDataQuery(100);
//     ``;
//     const coinData = coins?.data.coins;
//     console.log(coinData);

//     return (
//         <>
//             <Box>
//                 <Box display="flex" justifyContent="space-between" w="40rem" p="2rem" bg="rgba(0,0,0,0.16)">
//                     <Link>Coins</Link>
//                     <Link>Stocks</Link>
//                     <Link>Commodities</Link>
//                 </Box>

//                 <TableContainer
//                     bg="rgba(0,0,0,0.16)"
//                     backdropFilter="blur(1rem)"
//                     p="2rem"
//                     height={"70rem"}
//                     overflowY="scroll"
//                     boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
//                 >
//                     <Table variant={"simple"}>
//                         <Thead>
//                             <Tr position="sticky" top="0">
//                                 <Td>Coin</Td>
//                                 <Td>Rank</Td>
//                                 <Td>Value</Td>
//                                 <Td>Change (%)</Td>
//                                 <Td>Volume 24h</Td>
//                                 <Td>Market Cap</Td>
//                             </Tr>
//                         </Thead>
//                         <Tbody>
//                             {coinData?.map((coin: Coins, index) => {
//                                 return (
//                                     <Tr key={index}>
//                                         <Td>
//                                             <Box display="flex" alignItems="center" gap="2rem">
//                                                 <div>
//                                                     <img src={coin.iconUrl} style={{ width: "5rem", height: "5rem" }} />
//                                                 </div>
//                                                 <Text>{coin.symbol}</Text>
//                                                 <Text>{coin.name}</Text>
//                                             </Box>
//                                         </Td>
//                                         <Td textAlign="right">{coin.rank}</Td>
//                                         <Td textAlign="right">${millify(Number(coin.price), { precision: 2 })}</Td>
//                                         <Td textAlign="right">
//                                             {Number(coin.change) > 0 ? (
//                                                 <Text color="addition.200">{coin.change}%</Text>
//                                             ) : (
//                                                 <Text color="addition.400">{coin.change}%</Text>
//                                             )}
//                                         </Td>
//                                         <Td textAlign="right">${millify(Number(coin["24hVolume"]), { precision: 3 })}</Td>
//                                         <Td textAlign="right">${millify(Number(coin.marketCap), { precision: 3 })}</Td>
//                                     </Tr>
//                                 );
//                             })}
//                         </Tbody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </>
//     );
// };

// export default BrowseTable;

import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Link, Text, chakra, Image, Button, HStack } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, SortingState, getSortedRowModel, getPaginationRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Coins } from "src/redux/sliceTypes";
import millify from "millify";
import { createColumnHelper } from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

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
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // TODO: Scroll przy większej ilości wierszy + sticky header po scrollu (jak w TradingView)

    return (
        <Box display="flex" justifyContent="center" alignItems="center" overflowY="scroll" p="3rem">
            {data !== undefined ? (
                <Table
                    bg="rgba(0,0,0,0.16)"
                    backdropFilter="blur(1rem)"
                    height={"70rem"}
                    overflowY="scroll"
                    boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
                    maxW="130rem"
                >
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    console.log(header);
                                    const meta: any = header.column.columnDef.meta;
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
                        {table.getRowModel().rows.map((row, index) => {
                            return (
                                <Tr key={row.original.name} maxH="min-content" _hover={{ bg: "background.500" }}>
                                    {row.getVisibleCells().map((cell, index) => {
                                        const meta: any = cell.column.columnDef.meta;
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
    );
}
