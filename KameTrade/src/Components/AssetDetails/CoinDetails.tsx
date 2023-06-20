import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCoinDetailsQuery, useGetHistoricalCoinDataQuery, useGetCoinPriceQuery } from "src/redux/store/slices/coinSlice";
import { Select, Flex, GridItem, SimpleGrid, HStack, Box, Text, Button, Stack, Image, Heading, chakra, Grid, VStack, Icon } from "@chakra-ui/react";
import { RangeChart } from "../Chart/RangeChart";
import { PeriodSelector } from "./PeriodSelector";
import { useMemo } from "react";
import millify from "millify";
import { RedGradientBtn } from "../Buttons/RedGradientBtn";
import { CandleChart } from "../Chart/CandleChart";
import { PurpleBtn } from "../Buttons/PurpleBtn";
import { ButtonGroup } from "@chakra-ui/react";

import { MdOutlineAreaChart, MdOutlineCandlestickChart } from "react-icons/md";

// TODO: Fix issue with to large amount of data logged to the console

export const CoinDetails = () => {
    const { uuid } = useParams();
    const [chartType, setChartType] = useState<string>("range");
    const [historyPeriod, setHistoryPeriod] = useState("24h");
    const periods = ["24h", "7d", "30d", "3m", "1y", "3y", "5y"];

    //! Coin current price call
    const {
        data: coin,
        isFetching: coinDetailFetching,
        error: coinDetailError,
    } = useGetCoinDetailsQuery({ uuid: uuid as string, timePeriod: historyPeriod });
    const { data: coinPrice, isFetching: coinPriceFetching, error: coinPriceError } = useGetCoinPriceQuery(uuid as string);

    const price = coinPrice?.data?.price;
    const details = coin?.data?.coin;

    function historyHandleChange(e: ChangeEvent<HTMLSelectElement>) {
        const event = e.target;
        setHistoryPeriod(event.value);
    }

    // TODO: inactive button when user not logged in
    // TODO: create small chunks of codes, shrink them to several components
    //! TODO: prevent chart from rendering whole page!

    return (
        <>
            <Grid
                as="main"
                gridColumn={"span 2"}
                gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                p={{ base: "2rem 6rem", lg: "4rem 10rem" }}
                gap={{ base: "6rem", lg: "12rem" }}
            >
                <GridItem colSpan={{ base: 1, lg: 2 }} justifySelf="end">
                    <PeriodSelector value={historyPeriod} onChange={historyHandleChange} periods={periods} />
                </GridItem>

                <GridItem colStart={1} colEnd={2}>
                    {details && (
                        <Box display="flex" gap="4rem" as="section" mb={{ base: "3rem", lg: "6rem" }}>
                            <Box w="100%" h="auto" maxW={{ base: "6rem", lg: "10rem" }}>
                                <Image src={details?.iconUrl} alt="Asset logo"></Image>
                            </Box>
                            <Box>
                                <Box display="flex" alignItems="baseline" gap="1rem">
                                    <Heading as="h1" size="4xl">
                                        {details?.name}
                                    </Heading>
                                    <Heading as="h1" size="4xl" color={Number(details?.change) > 0 ? "addition.200" : "addition.500"}>
                                        {details?.symbol.toUpperCase()}
                                    </Heading>
                                </Box>

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
                                            <Text color={Number(details?.change) > 0 ? "addition.200" : "addition.500"}>{details?.change}%</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </GridItem>

                <GridItem colStart={{ base: 1, lg: 2 }} colEnd={{ base: 2, lg: 3 }}>
                    <Box display="flex" flexDir="column" alignItems="center" gap="5rem">
                        <Box
                            bg={"rgba(0,0,0,0.16)"}
                            p={{ base: "3rem", lg: "6rem" }}
                            borderRadius="0.375rem"
                            backdropFilter="blur(1rem)"
                            boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
                        >
                            <Heading
                                size="2xl"
                                color={details?.color as string}
                                mb={{ base: "2rem", lg: "3rem" }}
                            >{`About ${details?.name}`}</Heading>
                            <Text>{details?.description}</Text>
                        </Box>

                        <RedGradientBtn>Symulate Investment</RedGradientBtn>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <Box display="flex" flexDir="column" gap="3rem">
                        <Heading size="3xl" color="addition.800">
                            Key statistics
                        </Heading>

                        <Box
                            display="grid"
                            gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)" }}
                            gap="4rem"
                            textAlign="left"
                        >
                            {details && (
                                <>
                                    <Box>
                                        <Heading size="lg">Market Capitalization</Heading>
                                        <Text>{millify(Number(details?.marketCap as string), { precision: 3 })}</Text>
                                    </Box>
                                    <Box>
                                        <Heading size="lg">Dilluted Market Cap</Heading>
                                        <Text>{millify(Number(details?.fullyDilutedMarketCap as string), { precision: 3 })}</Text>
                                    </Box>
                                    <Box>
                                        <Heading size="lg">Volume 24h</Heading>
                                        <Text>{millify(Number(details?.["24hVolume"] as string), { precision: 3 })}</Text>
                                    </Box>
                                    <Box>
                                        <Heading size="lg">Circulating supply</Heading>
                                        <Text>{millify(Number(details?.supply.circulating as string), { precision: 3 })}</Text>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <VStack>
                        {uuid && (
                            <Box>
                                <ButtonGroup>
                                    <Button onClick={() => setChartType("range")}>
                                        <Icon as={MdOutlineAreaChart} />
                                    </Button>
                                    <Button onClick={() => setChartType("candle")}>
                                        <Icon as={MdOutlineCandlestickChart} color={"red"} />
                                    </Button>
                                </ButtonGroup>
                                {chartType === "range" ? (
                                    <RangeChart uuid={uuid} timePeriod={historyPeriod} />
                                ) : (
                                    <CandleChart uuid={uuid} timePeriod={historyPeriod} />
                                )}
                            </Box>
                        )}
                    </VStack>
                </GridItem>

                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <VStack>
                        <Box>Table</Box>
                    </VStack>
                </GridItem>
            </Grid>
        </>
    );
};
