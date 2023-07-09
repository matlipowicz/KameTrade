import { FcGoogle } from "react-icons/fc";
import { Button, Icon } from "@chakra-ui/react";

export const GoogleBtn = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
    return (
        <Button
            onClick={onClick}
            bg="addition.800"
            _hover={{ backgroundColor: "addition.700" }}
            borderColor="addition.800"
            borderWidth={"0.2rem"}
            size="lg"
            fontSize={"2rem"}
            p={{ base: "2rem", md: "2.5rem" }}
            display="flex"
            justifyContent="start"
            textAlign="center"
        >
            <Icon as={FcGoogle} fontSize="4rem" />
            {children}
        </Button>
    );
};
