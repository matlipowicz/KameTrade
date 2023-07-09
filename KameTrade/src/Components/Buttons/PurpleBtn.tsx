import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export const PurpleBtn = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
    return (
        <Button
            bg="addition.800"
            _hover={{ backgroundColor: "addition.700" }}
            borderColor="addition.800"
            borderWidth={"0.2rem"}
            size="lg"
            fontSize={"2rem"}
            p={{ base: "2rem", md: "2.5rem" }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
