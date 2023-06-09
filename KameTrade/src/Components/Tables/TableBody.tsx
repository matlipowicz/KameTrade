import { Tbody, Tr, Td } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

const TableBody = ({ isFetching, table }: { isFetching: boolean; table: any }) => {
    return (
        <>
            {isFetching ? (
                <Tr>
                    <Td>Loading...</Td>
                </Tr>
            ) : (
                <Tbody>
                    {isFetching && <div>Test fetch</div>}
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
            )}
        </>
    );
};

export default TableBody;
