import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { PaginationBtnProps } from "./paginationTypes";

const PaginationButton = ({ children, onClick, disabled, pageIndex }: PaginationBtnProps) => {
    return (
        <Button
            bg="transparent"
            borderColor={`${!disabled ? "addition.500" : "rgba(175,175,175,0.3)"}`}
            borderWidth={"0.2rem"}
            _hover={{ bg: `${!disabled ? "addition.500" : "transparent"}`, color: `${!disabled ? "text.900" : "rgba(175,175,175,0.3)"}` }}
            _active={{ bg: `${!disabled ? "addition.500" : "transparent"}`, color: `${!disabled ? "text.900" : "rgba(175,175,175,0.3)"}` }}
            size="lg"
            fontSize={"2rem"}
            color={`${!disabled ? "addition.500" : "rgba(175,175,175,0.3)"}`}
            p={{ base: "1.5rem", md: "2,25rem" }}
            onClick={onClick}
            disabled={disabled}
            ml="1rem"
        >
            {children}
        </Button>
    );
};

export default PaginationButton;
