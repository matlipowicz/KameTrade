import { Box, Text, Select } from "@chakra-ui/react";
export const RowSelector = ({ table }: { table: any }) => {
    const rowSelectionNumber: number[] = [10, 20, 30, 40, 50];
    return (
        <>
            <Box display="flex" gap="1.5rem">
                <Text>Show</Text>
                <Box>
                    <Select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        textAlign="center"
                        fontSize="1.4rem"
                        color="addition.200"
                        borderColor="addition.200"
                        _hover={{ borderColor: "addition.250" }}
                        focusBorderColor="addition.250"
                    >
                        {rowSelectionNumber.map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Select>
                </Box>

                <Text>rows per page</Text>
            </Box>
        </>
    );
};
