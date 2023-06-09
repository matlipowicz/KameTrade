import { Link, ListItem } from "@chakra-ui/react";
import { TableProps } from "./TablePagination";
import { Table } from "@tanstack/react-table";

// TODO: Add dots after 5th page, then
const PaginationPage = ({ pageNumber, pageIndex, table }: { pageNumber: number | string; pageIndex: number; table: Table<any> }) => {
    return (
        <ListItem
            key={pageNumber}
            minW="4rem"
            minH="4rem"
            bg={`${pageNumber === pageIndex ? "background.500" : ""}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="0.375rem"
            _active={{ bg: "background.600" }}
            _hover={{ bg: "background.600", cursor: "pointer" }}
            onClick={() => {
                if (typeof pageNumber !== "string") table.setPageIndex(pageNumber - 1);
            }}
        >
            <Link textDecor="none" _hover={{ textDecor: "none" }}>
                {pageNumber}
            </Link>
        </ListItem>
    );
};
export default PaginationPage;
