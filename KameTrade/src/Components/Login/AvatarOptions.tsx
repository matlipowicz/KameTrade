import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLockReset } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuGroup, MenuDivider, MenuItem, Box, Text, Flex, Center, Icon } from "@chakra-ui/react";
import { AuthContext } from "src/context/AuthContext";
import { Avatar } from "src/components/Nav/UserAvatar";
import { DarkYellowBtn } from "src/components/Buttons/DarkYellowBtn";

export const AvatarOptions = () => {
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Menu>
            <MenuButton>
                <Avatar />
            </MenuButton>
            <MenuList w="30rem" bg="rgba(0,0,0,0.16)" border="none" borderRadius="0.375rem">
                <MenuGroup>
                    <Flex gap="2rem" flexDir="column">
                        <Center flexDir="column" pt="1rem">
                            <Avatar />

                            {user ? (
                                <>
                                    <Text pt="2rem">{user?.["user_metadata"]?.["full_name"]}</Text>
                                    <Text fontSize="1.4rem" color="rgba(255,255,255,0.2)">
                                        {user?.["email"]}
                                    </Text>{" "}
                                </>
                            ) : null}
                        </Center>
                        <Box>
                            <MenuItem bg="none" _hover={{ bg: "rgba(255,255,255,0.1)" }} onClick={() => navigate("profile")}>
                                <Icon as={FaWallet} mr="1rem" />
                                <Text>Wallet</Text>
                            </MenuItem>
                            <MenuItem bg="none" _hover={{ bg: "rgba(255,255,255,0.1)" }}>
                                <Icon as={MdOutlineLockReset} mr="1rem" />
                                <Text onClick={() => navigate("/change-password")}>Change Passworrd</Text>
                            </MenuItem>
                            <MenuDivider borderColor="rgba(255,255,255,0.3)" />
                            <MenuItem bg="none" display="flex" justifyContent="center">
                                <DarkYellowBtn onClick={signOut}>Sign out</DarkYellowBtn>
                            </MenuItem>
                        </Box>
                    </Flex>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};
