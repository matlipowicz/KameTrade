import { useGetStockLogoQuery, useGetStockLastQuoteQuery, useGetHistoryDataQuery } from "src/redux/store/slices/stockTwelve";
import { useGetStockProfileQuery } from "src/redux/store/slices/stockYahoo";
import { useGetStockTotalPriceQuery } from "src/redux/store/slices/stockYahoo";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Select,
    Flex,
    GridItem,
    SimpleGrid,
    HStack,
    Box,
    Text,
    Button,
    Stack,
    Image,
    Heading,
    chakra,
    Grid,
    VStack,
    Icon,
    Link,
} from "@chakra-ui/react";
import { RangeStockChart } from "../../Chart/RangeChart/RangeStockChart";
import { PeriodSelector } from "../PeriodSelector";
import { useMemo } from "react";
import millify from "millify";
import { RedGradientBtn } from "../../Buttons/RedGradientBtn";
import { CandleChart } from "../../Chart/CandleChart/CandleCoinChart";
import { PurpleBtn } from "../../Buttons/PurpleBtn";
import { ButtonGroup } from "@chakra-ui/react";
import { ChartButton } from "../../Buttons/ChartButton";

import { MdOutlineAreaChart, MdOutlineCandlestickChart } from "react-icons/md";
import { AssetStatistics } from "../Coin/CoinStatistics";
import { UnrollBtn } from "../../Buttons/UnrollBtn";
import { CandleStockChart } from "../../Chart/CandleChart/CandleStockChart";
import { StockStatistics } from "./StockStatistics";
import { useQuery } from "@tanstack/react-query";
import { StockCharts } from "src/components/Chart/StockCharts";

// TODO: Create outputsize(period in days to get historical data)
// TODO:

export const StockDetails = () => {
    const { id } = useParams();
    const [showMore, setShowMore] = useState<boolean>(false);
    const [chartType, setChartType] = useState<string>("range");
    const [historyPeriod, setHistoryPeriod] = useState("24h");
    const periods = ["24h", "7d", "30d", "3m", "1y", "3y", "5y"];

    const { data: stockLogo, isFetching: stockLogoFetching, error: stockLogoError } = useGetStockLogoQuery(id as string);
    const { data: stockProfile, isFetching: stockProfileFetching, error: stockProfileError } = useGetStockProfileQuery(id as string);
    const {
        data: stockStatistics,
        isFetching: stockStatisticsFetching,
        error: stockStatisticsError,
    } = useGetStockLastQuoteQuery({ symbol: id as string, interval: "1day" });

    const { data: stockTotalPrice, isFetching: stockTotalPriceFetching, error: stockTotalPriceError } = useGetStockTotalPriceQuery(id as string);

    // Asset info
    const logo = stockLogo?.url;
    const profile = stockProfile?.assetProfile;
    const statisticData = stockStatistics;
    const marketCap = stockTotalPrice?.defaultKeyStatistics.enterpriseValue;

    function historyHandleChange(e: ChangeEvent<HTMLSelectElement>) {
        const event = e.target;
        setHistoryPeriod(event.value);
    }

    // console.log(statisticData);
    // TODO: WORK on Period of data

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
                {statisticData && profile !== undefined ? (
                    <>
                        <GridItem colStart={1} colEnd={2}>
                            <Box display="flex" gap="4rem" as="section" mb={{ base: "3rem", lg: "6rem" }}>
                                <Box w="100%" h="auto" maxW={{ base: "6rem", lg: "10rem" }}>
                                    <Image src={logo} alt="Asset logo"></Image>
                                </Box>
                                <Box>
                                    <Box display="flex" alignItems="baseline" gap="1rem">
                                        <Heading as="h1" size="4xl">
                                            {statisticData?.name}
                                        </Heading>
                                        <Heading as="h1" size="4xl">
                                            {statisticData?.symbol}
                                        </Heading>
                                    </Box>
                                    <Box>
                                        <Text fontSize="1.2rem" color="addition.500">
                                            Price
                                        </Text>
                                        <Box display="flex" alignItems="center" gap="min(1rem)">
                                            <chakra.span color="addition.150" fontSize="4rem">
                                                $
                                            </chakra.span>
                                            <Text fontSize="2.5rem" color="addition.200">
                                                {`${Number(statisticData?.close).toFixed(2)}`} <chakra.span color="addition.300">USD</chakra.span>
                                            </Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Box display="flex" gap="1rem">
                                                <Text>
                                                    <chakra.span color="addition.800">{historyPeriod}</chakra.span> Change
                                                </Text>
                                                <Text color={Number(statisticData?.percent_change) > 0 ? "addition.200" : "addition.500"}>
                                                    {Number(statisticData?.percent_change).toFixed(2)}%
                                                </Text>

                                                <Text color={Number(statisticData?.change) > 0 ? "addition.200" : "addition.500"}>
                                                    {Number(statisticData?.change).toFixed(4)} USD
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem colStart={{ base: 1, lg: 2 }} colEnd={{ base: 2, lg: 3 }}>
                            {profile && (
                                <>
                                    <Box display="flex" flexDir="column" alignItems="center" gap="5rem">
                                        <Box
                                            bg={"rgba(0,0,0,0.16)"}
                                            p={{ base: "3rem", lg: "6rem" }}
                                            borderRadius="0.375rem"
                                            backdropFilter="blur(1rem)"
                                            boxShadow="2px 14px 19px -10px rgba(0, 0, 0, 0.5)"
                                        >
                                            <Heading size="2xl" mb={{ base: "2rem", lg: "3rem" }}>{`About ${statisticData?.name}`}</Heading>
                                            <Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2,1fr)", "2xl": "repeat(3,1fr)" }} gap="3rem">
                                                <Box>
                                                    <Text fontWeight={700}>Sector</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.sector}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>Industry</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.industry}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>CEO</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.companyOfficers[0].name}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>Website</Text>
                                                    <Text>
                                                        <Link href={profile?.website}>{profile?.website.substring(8, profile?.website.lenght)}</Link>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>Employess</Text>
                                                    <Text>
                                                        <chakra.span>{millify(profile?.fullTimeEmployees)}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>Country</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.country}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>City</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.city}</chakra.span>
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={700}>Address</Text>
                                                    <Text>
                                                        <chakra.span>{profile?.address1}</chakra.span>
                                                    </Text>
                                                </Box>
                                            </Grid>
                                        </Box>

                                        <RedGradientBtn>Symulate Investment</RedGradientBtn>
                                    </Box>
                                </>
                            )}
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Text>{showMore ? profile?.longBusinessSummary : profile?.longBusinessSummary.substring(0, 300)}</Text>
                            <UnrollBtn onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</UnrollBtn>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, lg: 2 }}>
                            <VStack>
                                {id && (
                                    <Box>
                                        <Flex justifyContent="space-between" alignItems="center" mb="1.5rem">
                                            <ButtonGroup borderWidth="0.01rem" borderRadius="0.375rem" p="0.5rem" borderColor="background.600">
                                                <ChartButton onClick={() => setChartType("range")} chartType={chartType} id="range">
                                                    <Icon as={MdOutlineAreaChart} color="addition.500" w="2.5rem" h="2.5rem" />
                                                </ChartButton>
                                                <ChartButton onClick={() => setChartType("candle")} chartType={chartType} id="candle">
                                                    <Icon as={MdOutlineCandlestickChart} color="addition.500" w="2.5rem" h="2.5rem" />
                                                </ChartButton>
                                            </ButtonGroup>
                                            <Box>
                                                <PeriodSelector value={historyPeriod} onChange={historyHandleChange} periods={periods} />
                                            </Box>
                                        </Flex>
                                        <StockCharts id={id} historyPeriod={historyPeriod} chartType={chartType} />
                                    </Box>
                                )}
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, lg: 2 }}>
                            <Box>
                                <StockStatistics stats={statisticData} marketCap={marketCap} />
                            </Box>
                        </GridItem>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </Grid>
        </>
    );
};