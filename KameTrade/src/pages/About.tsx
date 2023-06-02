import { SimpleGrid, Box, Image, Text, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import graph from "src/assets/miscellaneous/About-graphics.svg";

const About = () => {
    return (
        // <Flex minHeight="100vh" alignItems={"center"} justifyContent={"center"}>
        //     About
        // </Flex>
        <SimpleGrid columns={2} spacing={5} minChildWidth={"35rem"} p={"5rem"}>
            <Box h={"70dvh"} display="flex" justifyContent="center" alignItems="center" p={{ base: "2.5rem", lg: "4rem" }}>
                <Image src={graph} alt="App graphic" w="60rem" />
            </Box>
            <Box
                h={"70dvh"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={12}
                p={{ base: "2.5rem", lg: "4rem" }}
            >
                <Heading size={{ base: "3xl", lg: "4xl" }} color="addition.800">
                    Learn how to invest with KameTrade
                </Heading>
                <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore cupiditate corrupti recusandae delectus debitis. Reprehenderit
                    temporibus, consequatur officiis perspiciatis unde quo. Reprehenderit obcaecati, repudiandae cum ipsam libero accusamus incidunt
                    labore. Reprehenderit obcaecati, repudiandae cum ipsam libero accusamus incidunt labore.
                </Text>
                <Box>
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
                        <Link to="/browse">Search for assets</Link>
                    </Button>
                </Box>
            </Box>
        </SimpleGrid>
    );
};

export default About;
