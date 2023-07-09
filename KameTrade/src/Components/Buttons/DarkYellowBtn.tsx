import { Button, Icon } from "@chakra-ui/react";

export const DarkYellowBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
    return (
        <Button
            onClick={onClick}
            bg="addition.185"
            _hover={{ backgroundColor: "addition.175" }}
            _active={{ backgroundColor: "addition.175" }}
            borderColor="addition.185"
            borderWidth={"0.3rem"}
            size="lg"
            fontSize={"2rem"}
            p={{ base: "1.5rem", md: "2rem" }}
            display="flex"
            justifyContent="start"
            textAlign="center"
        >
            {children}
        </Button>
    );
};
