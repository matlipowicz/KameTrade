import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, chakra, Image, Button, HStack, Heading } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Coins } from "src/redux/sliceTypes";
import { createColumnHelper } from "@tanstack/react-table";
import TablePagination from "../Pagination/TablePagination";
import { RowSelector } from "./RowSelector";
import millify from "millify";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import TableBody from "./TableBody";

// export type DataTableProps<Data extends object> = {
//     data: Data[];
//     columns: ColumnDef<Data, any>[];
// };

// const columnHelper = createColumnHelper<Coins>();
// const columns = [
//     columnHelper.accessor("name", {
//         header: () => <Text>Coin</Text>,
//         cell: (info) => {
//             return (
//                 <HStack display="flex" gap="3rem" w="36rem">
//                     <Box w="5rem" h="5rem">
//                         <Image src={info.row.original.iconUrl} alt="Coin logo" maxH="100%" maxW="100%" />
//                     </Box>
//                     <Box display="flex" gap="3rem">
//                         <RouterLink to={`/browse/${info.row.original.name.toLowerCase()}`}>
//                             <Button
//                                 minW="8rem"
//                                 fontSize="1.4rem"
//                                 bg="addition.700"
//                                 _hover={{ bg: "addition.800" }}
//                                 _focus={{ bg: "addition.800" }}
//                                 position="static"
//                             >
//                                 {info.row.original.symbol}
//                             </Button>
//                         </RouterLink>
//                         <Text>{info.row.original.name}</Text>
//                     </Box>
//                 </HStack>
//             );
//         },
//     }),

//     columnHelper.accessor("rank", {
//         cell: (info) => info.getValue(),
//         header: () => "Rank",
//         meta: {
//             isNumeric: true,
//         },
//     }),
//     columnHelper.accessor("price", {
//         cell: (info) => {
//             const assetPrice = millify(parseFloat(info.getValue()), { precision: 4 });
//             return (
//                 <Text>
//                     {assetPrice}{" "}
//                     <chakra.span fontSize="1.2rem" color="addition.150">
//                         USD
//                     </chakra.span>
//                 </Text>
//             );
//         },
//         header: () => "Value",
//         meta: {
//             isNumeric: true,
//         },
//     }),
//     columnHelper.accessor("change", {
//         cell: (info) => {
//             const change = parseFloat(info.getValue()).toFixed(2);
//             const adjustColor = Number(change) > 0 ? <Text color="addition.200">+{change}%</Text> : <Text color="addition.400">{change}%</Text>;
//             return adjustColor;
//         },
//         header: () => "Change (%)",
//         meta: {
//             isNumeric: true,
//         },
//     }),
//     columnHelper.accessor("24hVolume", {
//         cell: (info) => {
//             return (
//                 <Text>
//                     {millify(parseFloat(info.getValue()), { precision: 3 })}{" "}
//                     <chakra.span fontSize="1.2rem" color="addition.150">
//                         USD
//                     </chakra.span>
//                 </Text>
//             );
//         },
//         header: () => "Volume 24h",
//         meta: {
//             isNumeric: true,
//         },
//     }),
//     columnHelper.accessor("marketCap", {
//         cell: (info) => {
//             return (
//                 <Text>
//                     {millify(parseFloat(info.getValue()), { precision: 3 })}{" "}
//                     <chakra.span fontSize="1.2rem" color="addition.150">
//                         USD
//                     </chakra.span>
//                 </Text>
//             );
//         },
//         header: () => "Market Cap",
//         meta: {
//             isNumeric: true,
//         },
//     }),
// ];

// export const CoinTable = ({ coinsData, isFetching }: { coinsData: Coins[]; isFetching: boolean }) => {
//     const table = useReactTable({
//         columns,
//         data: coinsData,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//     });

//     return (
//         <>
//             <Box maxH="83.1rem" overflowY="scroll">
//                 <Table bg="rgba(0,0,0,0.16)" backdropFilter="blur(1rem)" boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)" maxW="120rem">
//                     <Thead position="relative">
//                         {table.getHeaderGroups().map((headerGroup) => {
//                             console.log(headerGroup);
//                             return (
//                                 <Tr key={headerGroup.id}>
//                                     {headerGroup.headers.map((header) => {
//                                         return (
//                                             <Th
//                                                 key={header.id}
//                                                 onClick={header.column.getToggleSortingHandler()}
//                                                 fontSize="1.8rem"
//                                                 fontWeight={700}
//                                                 lineHeight="2rem"
//                                                 p="2.5rem 5rem"
//                                                 color="addition.600"
//                                                 bg={"addition.700"}
//                                                 _hover={{ bg: "addition.800", cursor: "pointer" }}
//                                                 position="sticky"
//                                                 top="0"
//                                                 textAlign="center"
//                                             >
//                                                 <HStack display="flex" alignItems="center" justifyContent="space-between">
//                                                     <Box w="max-content">
//                                                         {flexRender(header.column.columnDef.header, header.getContext())}

//                                                         <Box position="absolute" right="6" top="50%" transform="translate(0%,-50%)">
//                                                             <chakra.span position="relative" bottom="0.2rem">
//                                                                 {header.column.getIsSorted() ? (
//                                                                     header.column.getIsSorted() === "desc" ? (
//                                                                         <ArrowDownIcon color="addition.150" />
//                                                                     ) : (
//                                                                         <ArrowUpIcon color="addition.150" />
//                                                                     )
//                                                                 ) : null}
//                                                             </chakra.span>
//                                                         </Box>
//                                                     </Box>
//                                                 </HStack>
//                                             </Th>
//                                         );
//                                     })}
//                                 </Tr>
//                             );
//                         })}
//                     </Thead>

//                     <Tbody>
//                         {isFetching && <div>Test fetch</div>}
//                         {table.getRowModel().rows.map((row) => {
//                             return (
//                                 <Tr key={row.original.name} maxH="min-content" _hover={{ bg: "background.500" }}>
//                                     {row.getVisibleCells().map((cell, index) => {
//                                         return (
//                                             <Td key={index} lineHeight="2rem" textAlign="center">
//                                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                             </Td>
//                                         );
//                                     })}
//                                 </Tr>
//                             );
//                         })}
//                     </Tbody>

//                     <TableBody table={table} isFetching={isFetching} />
//                 </Table>
//             </Box>

//             <HStack display="flex" alignItems="center" justifyContent="space-between" w="100%" mt="3rem" maxW="150rem">
//                 <RowSelector table={table} />
//                 <TablePagination table={table} data={coinsData} />
//             </HStack>
//         </>
//     );
// };
