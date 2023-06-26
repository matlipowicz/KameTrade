import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

export const UnrollBtn = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
    return (
        <Button
            // borderColor="addition.600"
            // borderWidth={"0.2rem"}
            border="none"
            _hover={{ backgroundColor: "addition.600", color: "background.800" }}
            _active={{ backgroundColor: "addition.600", color: "background.800" }}
            color="addition.600"
            variant="outline"
            size="lg"
            fontSize={"2rem"}
            p={{ base: "2rem", md: "2.5rem" }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
