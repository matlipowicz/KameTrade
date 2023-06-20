import { SimpleGrid, Box, Image, Text, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import graph from "src/assets/miscellaneous/About-graphics.svg";
import { RedGradientBtn } from "src/components/Buttons/RedGradientBtn";

const About = () => {
    return (
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
                    <Link to="/browse">
                        <RedGradientBtn>Search for assets</RedGradientBtn>
                    </Link>
                </Box>
            </Box>
        </SimpleGrid>
    );
};
export default About;
