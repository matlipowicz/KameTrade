import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ChartButton = ({ children, onClick, chartType, id }: { children: ReactNode; onClick: () => void; chartType: string; id: string }) => {
    return (
        <Button
            onClick={onClick}
            bg={chartType === id ? "background.700" : "transparent"}
            _hover={{ backgroundColor: "background.700" }}
            _active={{ bg: "background.700" }}
            size="lg"
            fontSize={"2rem"}
            p={{ base: "1rem", md: "1.5rem" }}
        >
            {children}
        </Button>
    );
};
