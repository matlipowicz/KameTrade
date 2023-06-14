import { Tbody, Tr, Td, Box, Spinner } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Coin, Coins } from "src/redux/sliceTypes";
import { Table } from "@tanstack/react-table";

export const CoinBody = ({
    coinsData,
    table,
    columnQuantity,
    query,
}: {
    coinsData: Coin[];
    table: Table<Coins>;
    columnQuantity: number;
    query: string;
}) => {
    return (
        <>
            <Tbody maxW="120rem">
                {coinsData ? (
                    table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.original.name} maxH="min-content" _hover={{ bg: "background.500" }} lineHeight="30rem">
                                {row.getVisibleCells().map((cell, index) => {
                                    return (
                                        <Td key={index} lineHeight="2rem" textAlign="center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })
                ) : (
                    <Tr>
                        <Td colSpan={columnQuantity} borderBottom="none">
                            <Box display="flex" justifyContent="center">
                                <Spinner color="addition.100" emptyColor="background.500" thickness="0.5rem" speed="0.75s" size="xl" />
                            </Box>
                        </Td>
                    </Tr>
                )}
            </Tbody>
        </>
    );
};
