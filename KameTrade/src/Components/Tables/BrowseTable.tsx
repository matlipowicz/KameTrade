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
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td, Box, Link, Text, chakra, Image } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useReactTable, getCoreRowModel, SortingState, getSortedRowModel, getPaginationRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Coins } from "src/redux/sliceTypes";
import millify from "millify";
import { createColumnHelper } from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

const columnHelper = createColumnHelper<Coins>();
const columns = [
    columnHelper.accessor("iconUrl", {
        header: () => "Coin",
        cell: (info) => (
            <Box w="5rem" h="5rem">
                <Image src={info.getValue()} alt="Coin logo" maxH="100%" maxW="100%" />
            </Box>
        ),
        enableSorting: false,
    }),
    columnHelper.accessor("name", {
        header: () => "",
        cell: (info) => info.getValue(),
        enableSorting: false,
    }),
    columnHelper.accessor("symbol", {
        header: () => "",
        cell: (info) => info.getValue(),
        enableSorting: false,
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
            return <Text>{assetPrice} USD</Text>;
        },
        header: () => "Value",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("change", {
        cell: (info) => {
            // const change = millify(parseFloat(info.getValue()), { precision: 2 });
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
        cell: (info) => millify(parseFloat(info.getValue()), { precision: 3 }),
        header: () => "Volume 24h",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("marketCap", {
        cell: (info) => millify(parseFloat(info.getValue()), { precision: 3 }),
        header: () => "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
];

export function DataTable({ data }: { data: Coins[] }) {
    const [sorted, setSorted] = useState<SortingState>([]);
    const navigate = useNavigate();

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // TODO: przypisac inny key zamiast indexu
    // TODO: usunac sortowanie po Coin + dwa puste pola
    // TODO: Scroll przy większej ilości wierszy + sticky header po scrollu (jak w TradingView)
    // TODO: wykluczyc puste pola z hovera (zrobic jako jeden table head)
    //? Jak wyswietlic wieksza ilosc wierszy? (25/50/100)
    return (
        <Box display="flex" justifyContent="center" alignItems="center" overflowY="scroll">
            {data !== undefined ? (
                <Table
                    bg="rgba(0,0,0,0.16)"
                    backdropFilter="blur(1rem)"
                    p="2rem"
                    height={"70rem"}
                    overflowY="scroll"
                    boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
                    maxW="150rem"
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
                                            color="addition.600"
                                            p="2rem"
                                            textAlign="center"
                                            lineHeight="2rem"
                                            position="relative"
                                            _hover={{ backgroundColor: "background.500", cursor: "pointer" }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                            <chakra.span pos="absolute" right="1rem" top="1.8rem">
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === "desc" ? (
                                                        <ArrowDownIcon color="addition.150" />
                                                    ) : (
                                                        <ArrowUpIcon color="addition.150" />
                                                    )
                                                ) : null}
                                            </chakra.span>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row, index) => {
                            return (
                                <Tr key={row.original.name} maxH="min-content" onClick={() => navigate(`/browse/${row.original.name.toLowerCase()}`)}>
                                    {row.getVisibleCells().map((cell, index) => {
                                        const meta: any = cell.column.columnDef.meta;
                                        return (
                                            <Td key={index} isNumeric={meta?.isNumeric} lineHeight="2rem">
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
