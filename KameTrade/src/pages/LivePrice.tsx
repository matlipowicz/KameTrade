import { Flex } from "@chakra-ui/react";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";

const LivePrice = () => {
    return (
        <Flex minHeight="100vh" alignItems={"center"} justifyContent={"center"}>
            Live Price
        </Flex>
    );
};

export default LivePrice;
