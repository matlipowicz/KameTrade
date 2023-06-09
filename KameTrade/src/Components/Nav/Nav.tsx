import { useState, useEffect } from "react";
import logo from "src/assets/logo/Dark-version.svg";
import { Box, Flex, Spacer, Text, HStack, useDisclosure, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import { NavBar } from "./NavElements";
import SideNav from "./SideNav";

// TODO: React icons for mobile navbar

const Navigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [color, setColor] = useState<boolean>(false);

    const changeColor = () => {
        window.scrollY >= 90 ? setColor(true) : setColor(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeColor);
        return () => {
            window.removeEventListener("scroll", changeColor);
        };
    }, [color]);

    return (
        <>
            <Flex
                minWidth="max-content"
                alignItems="center"
                gap="2"
                p="3rem"
                justifyContent="space-between"
                as="header"
                position="sticky"
                top="0"
                zIndex="1"
                bg={color ? "rgba(40,40,60,0.5)" : "none"}
                backdropFilter="blur(1.5rem)"
            >
                <HStack w={"22rem"} _hover={{ cursor: "pointer" }}>
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </HStack>

                <Flex gap={"5rem"} display={{ base: "none", xl: "flex" }}>
                    <NavBar />
                    <Buttons />
                </Flex>

                <SideNav isOpen={isOpen} onClose={onClose} />
                <HamburgerIcon onClick={onOpen} _hover={{ cursor: "pointer" }} w={"4rem"} h={"4rem"} display={{ base: "flex", xl: "none" }} />
            </Flex>
        </>
    );
};

export default Navigation;
