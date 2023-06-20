import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

export const BlueBtn = ({ children }: { children: ReactNode }) => {
    return (
        <Button
            borderColor="addition.600"
            borderWidth={"0.2rem"}
            _hover={{ backgroundColor: "addition.600", color: "text.900" }}
            variant="outline"
            size="lg"
            fontSize={"2rem"}
            p={{ base: "2rem", md: "2.5rem" }}
        >
            {children}
        </Button>
    );
};
