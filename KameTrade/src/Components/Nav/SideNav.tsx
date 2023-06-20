import { useRef } from "react";
import { Box, Flex, Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Hide } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ButtonContainer } from "src/components/Nav/Buttons";
import { NavBar } from "src/components/Nav/NavElements";

// TODO: React icons for mobile navbar

export const SideNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const btnRef = useRef<any>();

    return (
        <>
            <Hide above="xl">
                <Drawer isOpen={isOpen} onClose={onClose} onEsc={onClose} placement="right" finalFocusRef={btnRef} size={{ base: "md", lg: "lg" }}>
                    <DrawerOverlay />
                    <DrawerContent backgroundColor={"background.600"} p={{ base: "2rem", md: "3rem" }}>
                        <Box onClick={onClose}>
                            <CloseIcon _hover={{ cursor: "pointer" }} w="2.5rem" h="2.5rem" />
                        </Box>
                        <DrawerBody display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                            <Flex gap={"2rem"} flexDir="column">
                                <NavBar />
                            </Flex>
                        </DrawerBody>
                        <DrawerFooter>
                            <ButtonContainer />
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Hide>
        </>
    );
};
