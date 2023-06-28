import { Tbody, Tr, Td } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";

export const TableBody = <T extends { name: string }>({ table }: { table: Table<T> }) => {
    // TODO: Change index key to other unique value
    return (
        <>
            <Tbody maxW="120rem">
                {table.getRowModel().rows.map((row, index) => {
                    return (
                        <Tr key={index} maxH="min-content" _hover={{ bg: "background.500" }} lineHeight="30rem">
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
        </>
    );
};
