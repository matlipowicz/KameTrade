import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCoinDetailsQuery, useGetHistoricalCoinDataQuery, useGetCoinPriceQuery } from "src/redux/store/slices/coinSlice";
import { Select, Flex, GridItem, SimpleGrid, HStack, Box, Text, Button, Stack, Image, Heading, chakra, Grid, VStack } from "@chakra-ui/react";

export const CoinDetails = () => {
    const [historyPeriod, setHistoryPeriod] = useState("1h");
    const { uuid } = useParams();
    const periods = ["1h", "3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

    const {
        data: coin,
        isFetching: coinDetailFetching,
        error: coinDetailError,
    } = useGetCoinDetailsQuery({ uuid: uuid as string, timePeriod: historyPeriod });
    const { data: coinPrice, isFetching: coinPriceFetching, error: coinPriceError } = useGetCoinPriceQuery(uuid as string);
    const {
        data: coinHistory,
        isFetching: coinHistoryFetching,
        error: coinHistoryError,
    } = useGetHistoricalCoinDataQuery({ uuid: uuid as string, timePeriod: historyPeriod });

    const price = coinPrice?.data?.price;
    const details = coin?.data?.coin;
    const priceHistory = coinHistory?.data?.history;
    console.log(details);
    console.log(priceHistory);

    function historyHandleChange(e: ChangeEvent<HTMLSelectElement>) {
        const event = e.target;
        setHistoryPeriod(event.value);
    }

    // TODO: inactive button when user not logged in
    // TODO: create small chunks of codes, shrink them to several components

    return (
        <>
            {/* <Flex p="6rem 10rem" flexDir="column"> */}
            {/* <GridItem colSpan={{ base: 1, lg: 2 }}> */}
            {/* <Text>Choose Period</Text>
            <Select placeholder="Select value" onChange={historyHandleChange} w="" alignSelf="end">
                <option selected={true}>{"1h"}</option>
                {periods.map((period) => {
                    if (period !== "1h") return <option value={period}>{period}</option>;
                })}
            </Select> */}
            {/* </GridItem> */}
            <Box>
                <GridItem>
                    <Box display="flex" gap="4rem" minH="40rem" as="section">
                        <Box w="100%" h="auto" maxW={{ base: "6rem", lg: "10rem" }}>
                            <Image src={details?.iconUrl} alt="Asset logo"></Image>
                        </Box>
                        <Box>
                            <Text display="flex" alignItems="baseline" gap="1rem">
                                <Heading as="h1" size="4xl">
                                    {details?.name}
                                </Heading>
                                <Heading as="h1" size="4xl" color={details?.change > 0 ? "addition.200" : "addition.500"}>
                                    {details?.symbol.toUpperCase()}
                                </Heading>
                            </Text>

                            <Text> {`Rank #${details?.rank}`}</Text>
                            <Box>
                                <Text fontSize="1.2rem" color="addition.500">
                                    Price
                                </Text>
                                <Box display="flex" alignItems="center" gap="min(1rem)">
                                    <chakra.span color="addition.150" fontSize="4rem">
                                        $
                                    </chakra.span>
                                    <Text fontSize="2.5rem" color="addition.200">
                                        {`${Number(price).toFixed(2)}`} <chakra.span color="addition.300">USD</chakra.span>
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    <Text>
                                        Change (%) <chakra.span color="addition.800">{historyPeriod}</chakra.span>
                                    </Text>
                                    <Box>
                                        <Text color={details?.change > 0 ? "addition.200" : "addition.500"}>{details?.change}%</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </GridItem>
            </Box>
            <GridItem>
                <Box>
                    <Text>{details?.description}</Text>
                    <Button>Symulate Invest</Button>
                </Box>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 2 }}>
                <VStack>
                    <Box>Chart</Box>
                    <Box>
                        <Select placeholder="Select value" onChange={historyHandleChange}>
                            <option selected={true}>{"1h"}</option>
                            {periods.map((period) => {
                                if (period !== "1h") return <option value={period}>{period}</option>;
                            })}
                        </Select>
                    </Box>
                </VStack>
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 2 }}>
                <VStack>
                    <Box>Table</Box>
                </VStack>
            </GridItem>
            {/* </Flex> */}
        </>
    );
};
