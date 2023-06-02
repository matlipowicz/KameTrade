import { useState, useRef, ReactElement } from "react";
import logo from "src/assets/logo/Dark-version.svg";
import { Box, Flex, Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Hide } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import { NavBar } from "./NavElements";
// TODO: React icons for mobile navbar

const SideNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // TODO: Make slide menu
    // if (!isOpen) {
    //     return null;
    // }

    const btnRef = useRef<any>();

    return (
        <>
            {/* MY VERSION */}
            {/* <Box
                bg={"addition.800"}
                h={"100vh"}
                w={"50rem"}
                display={isOpen ? { base: "flex", xl: "none" } : { base: "none", xl: "none" }}
                pos={{ base: "fixed" }}
                top="0"
                right="0"
            >
                <Flex minWidth="max-content" alignItems="end" gap="2" p={"4rem"} justifyContent="space-between" flexDirection="column" h={"100%"}>
                    <div onClick={onClose}>
                        <CloseIcon _hover={{ cursor: "pointer" }} />
                    </div>
                    <Flex gap={"2rem"} flexDir="column">
                        <NavBar />
                    </Flex>
                    <Buttons />
                </Flex>
            </Box> */}

            {/* CHAKRA VERSION */}
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
                            <Buttons />
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Hide>
        </>
    );
};

export default SideNav;
