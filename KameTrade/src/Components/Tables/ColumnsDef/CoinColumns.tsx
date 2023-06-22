import { Coins } from "src/redux/sliceTypes";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Image, HStack, Button, chakra } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import millify from "millify";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

const columnHelper = createColumnHelper<Coins>();
export const CoinColumns = [
    columnHelper.accessor("name", {
        header: () => <Text>Coin</Text>,
        cell: (info) => {
            return (
                <HStack display="flex" gap="3rem" w="36rem">
                    <Box w="5rem" h="5rem">
                        <Image src={info.row.original.iconUrl} alt="Coin logo" maxH="100%" maxW="100%" />
                    </Box>
                    <Box display="flex" gap="3rem">
                        <RouterLink to={`/browse/crypto/${info.row.original.symbol}/${info.row.original.uuid}`}>
                            <Button
                                minW="8rem"
                                fontSize="1.4rem"
                                bg="addition.700"
                                _hover={{ bg: "addition.800" }}
                                _focus={{ bg: "addition.800" }}
                                position="static"
                            >
                                {info.row.original.symbol}
                            </Button>
                        </RouterLink>
                        <Text>{info.row.original.name}</Text>
                    </Box>
                </HStack>
            );
        },
        meta: {
            enableColumnFilters: true,
        },
    }),

    columnHelper.accessor("rank", {
        cell: (info) => info.getValue(),
        header: () => "Rank",
        meta: {
            isNumeric: true,
            enableColumnFilters: true,
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
            enableColumnFilters: false,
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
            enableColumnFilters: false,
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
            enableColumnFilters: false,
        },
    }),
];
