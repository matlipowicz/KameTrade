import { Tbody, Tr, Td, Box, Spinner } from "@chakra-ui/react";

export const TableSpinner = ({ columnQuantity }: { columnQuantity: number }) => {
    return (
        <>
            <Tbody>
                <Tr>
                    <Td colSpan={columnQuantity} borderBottom="none">
                        <Box display="flex" justifyContent="center">
                            <Spinner color="addition.100" emptyColor="background.500" thickness="0.5rem" speed="0.75s" size="xl" />
                        </Box>
                    </Td>
                </Tr>
            </Tbody>
        </>
    );
};
