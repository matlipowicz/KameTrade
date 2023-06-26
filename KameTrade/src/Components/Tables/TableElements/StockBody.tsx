import { Tbody, Tr, Td, Box, Spinner } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Datum } from "src/redux/sliceTypes";

export const StockBody = ({ stockListData, table, columnQuantity }: { stockListData: Datum[]; table: any; columnQuantity: number }) => {
    return (
        <>
            <Tbody h="71rem" maxW="120rem">
                {stockListData ? (
                    table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id} maxH="min-content" _hover={{ bg: "background.500" }}>
                                {row.getVisibleCells().map((cell, index) => {
                                    return (
                                        <Td key={cell.id} lineHeight="2rem" textAlign="center">
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
