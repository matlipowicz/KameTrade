import { Tbody, Tr, Td } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Coin, Coins } from "src/redux/sliceTypes";
import { Table } from "@tanstack/react-table";

export const TableBody = <T extends { name: string }>({ table, query }: { table: Table<T>; query: string }) => {
    return (
        <>
            <Tbody maxW="120rem">
                {table.getRowModel().rows.map((row) => {
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
                })}
            </Tbody>
        </>
    );
};
