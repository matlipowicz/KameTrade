import { Flex, Center, Box, Text, HStack } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { IoLogoFacebook, IoLogoLinkedin, IoIosMail, IoLogoGithub } from "react-icons/io";
import { Link } from "@chakra-ui/react";

const ICONS = [
    { icon: <IoLogoGithub />, href: "https://github.com/matlipowicz" },
    { icon: <IoLogoFacebook />, href: "https://www.facebook.com/mateusz.lipowicz" },
    { icon: <IoLogoLinkedin />, href: "https://www.linkedin.com/in/mateusz-lipowicz-87737220a/?locale=en_US" },
    { icon: <IoIosMail />, href: "mailto:matlipowicz@gmail.com" },
];

const Footer = () => {
    return (
        <Flex as="footer" alignItems="center" flexDirection="column" p="2rem" gap={3}>
            <Text as="b">Want to contact? Catch me on my socials</Text>
            <HStack gap={12}>
                {ICONS.map(({ icon, href }) => (
                    <Center w="4rem" h="4rem" _hover={{ cursor: "pointer", color: "addition.600", borderRadius: "1rem" }} key={href}>
                        <IconContext.Provider value={{ size: "3rem" }}>
                            {
                                <Link href={href} target="_blank">
                                    {icon}
                                </Link>
                            }
                        </IconContext.Provider>
                    </Center>
                ))}
            </HStack>
            <Flex justify="center" align="center" flexDirection="column" gap={6}>
                <Box textAlign="center">
                    <Text>
                        Created by:{" "}
                        <Text as="b" color="addition.800">
                            Mateusz Lipowicz
                        </Text>{" "}
                    </Text>
                    <Text fontSize="1.4rem" color="gray.600">
                        &copy; 2023 Copyright All Rights Reserved
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Footer;
