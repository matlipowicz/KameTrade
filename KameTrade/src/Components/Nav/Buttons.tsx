import { Button, ButtonGroup } from "@chakra-ui/react";

export const Buttons = () => {
    return (
        <>
            <ButtonGroup spacing={"1rem"} flexWrap={"wrap"}>
                <Button
                    bg="addition.800"
                    _hover={{ backgroundColor: "addition.700" }}
                    borderColor="addition.800"
                    borderWidth={"0.2rem"}
                    size="lg"
                    fontSize={"2rem"}
                    p={{ base: "2rem", md: "2.5rem" }}
                >
                    Sign up
                </Button>
                <Button
                    borderColor="addition.600"
                    borderWidth={"0.2rem"}
                    _hover={{ backgroundColor: "addition.600", color: "text.900" }}
                    variant="outline"
                    size="lg"
                    fontSize={"2rem"}
                    p={{ base: "2rem", md: "2.5rem" }}
                >
                    Sign in
                </Button>
            </ButtonGroup>
        </>
    );
};
