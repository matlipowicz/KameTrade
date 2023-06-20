import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

export const RedGradientBtn = ({ children }: { children: ReactNode }) => {
    return (
        <Button
            size="lg"
            p={{ base: "2rem", md: "2.5rem" }}
            bgGradient="linear(to-r,addition.400,addition.500)"
            fontSize={"2rem"}
            color={"background.800"}
            borderWidth={"0.2rem"}
            borderColor="addition.400"
            _hover={{ bg: "transparent", color: "addition.500" }}
            variant="unstyled"
            display="flex"
            transition={"0.2s all"}
        >
            {children}
        </Button>
    );
};
