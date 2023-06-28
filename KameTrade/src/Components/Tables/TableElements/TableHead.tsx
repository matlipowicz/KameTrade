import { Thead, Tr, Th, HStack, Box, chakra } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";

export const TableHead = <T,>({ table }: { table: Table<T> }) => {
    return (
        <Thead position="relative">
            {table.getHeaderGroups().map((headerGroup) => {
                return (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <Th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    fontSize="1.8rem"
                                    fontWeight={700}
                                    lineHeight="2rem"
                                    p="2.5rem "
                                    color="addition.600"
                                    bg={"addition.700"}
                                    _hover={{ bg: "addition.800", cursor: "pointer" }}
                                    position="sticky"
                                    top="13.4rem"
                                >
                                    <HStack display="flex" justifyContent="space-between" alignItems="center">
                                        <Box w="fit-content">
                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                            <Box position="absolute" right="6" top="50%" transform="translate(0%,-50%)">
                                                <chakra.span position="relative" bottom="0.2rem">
                                                    {header.column.getIsSorted() ? (
                                                        header.column.getIsSorted() === "desc" ? (
                                                            <ArrowDownIcon color="addition.150" />
                                                        ) : (
                                                            <ArrowUpIcon color="addition.150" />
                                                        )
                                                    ) : null}
                                                </chakra.span>
                                            </Box>
                                        </Box>
                                    </HStack>
                                </Th>
                            );
                        })}
                    </Tr>
                );
            })}
        </Thead>
    );
};
