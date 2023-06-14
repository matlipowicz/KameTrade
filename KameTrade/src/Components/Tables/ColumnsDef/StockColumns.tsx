import { Coins } from "src/redux/sliceTypes";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Image, HStack, Button, chakra } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import millify from "millify";

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};
// TODO: Show more as link with arrow
const columnHelper = createColumnHelper<any>();
export const StockColumns = [
    columnHelper.accessor("symbol", {
        header: () => <Text>Symbol</Text>,
        cell: (info) => {
            return (
                <HStack>
                    <Box display="flex" alignItems="center" gap="3rem" w="100%">
                        <RouterLink to={`/browse/stock/${info.row.original.symbol}`}>
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
                        <Box flexGrow="1">
                            <RouterLink to={`/browse/stock/${info.row.original.symbol}`}>
                                <Box display="flex" alignItems="center" gap="2rem" justifyContent="end">
                                    <Text color="addition.600">Show more</Text>
                                    <ChevronRightIcon
                                        _hover={{ cursor: "pointer", backgroundColor: "addition.150", transition: "all 0.6s", color: "addition.700" }}
                                        _active={{
                                            cursor: "pointer",
                                            backgroundColor: "addition.185",
                                            transition: "all 0.6s",
                                            color: "addition.700",
                                        }}
                                        w="4rem"
                                        h="4rem"
                                        borderRadius="50%"
                                    />
                                </Box>
                            </RouterLink>
                        </Box>
                    </Box>
                </HStack>
            );
        },
    }),
    // columnHelper.display({
    //     id: "show-more",
    //     cell: (info) => (

    //     ),
    // }),
];
