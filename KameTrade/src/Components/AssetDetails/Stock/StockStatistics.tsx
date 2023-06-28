import { Box, Text, Icon, chakra, Table, Tbody, Tr, Th, Td, Link, Flex, Heading } from "@chakra-ui/react";
import { MdOutlineQueryStats } from "react-icons/md";
import { useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { BsCalendar3Week } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import millify from "millify";

export const StockStatistics = ({ stats, marketCap }: { stats: any | undefined; marketCap: any | undefined }) => {
    // console.log(stats);

    // useEffect(() => {
    //     if (details !== undefined) {
    //         const allTimeHighTimestamp: string | undefined = new Date(details?.allTimeHigh?.timestamp * 1000).toLocaleDateString();
    //         setDate(allTimeHighTimestamp);
    //     }
    // }, [details]);
    // console.log(marketCap);
    return (
        <Box display="flex" justifyContent="space-around" gap="5rem" alignItems="center">
            <Box flex={1}>
                <Heading size="2xl" color="addition.800">
                    Key statistics
                </Heading>
                {stats && marketCap && (
                    <Table w="100%">
                        <Tbody>
                            <Tr>
                                <Td>{<Icon as={AiOutlineLock} />}</Td>
                                <Th>Previous Close</Th>
                                <Td>
                                    <chakra.span>$ {Number(stats.previous_close).toFixed(2)}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={AiOutlineUnlock} />}</Td>
                                <Th>Open</Th>
                                <Td>
                                    <chakra.span>$ {Number(stats.open).toFixed(2)}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={BsCalendar3Week} />}</Td>
                                <Th>Fifty two week</Th>
                                <Td>
                                    <chakra.span>$ {stats.fifty_two_week.range}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={FaRegHandshake} />}</Td>
                                <Th>Volume</Th>
                                <Td>
                                    <chakra.span>$ {millify(Number(stats.volume))}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={FaRegHandshake} />}</Td>
                                <Th>Avg.volume</Th>
                                <Td>
                                    <chakra.span>$ {millify(Number(stats.average_volume))}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={MdOutlineQueryStats} />}</Td>
                                <Th>Marekt Cap</Th>
                                <Td>
                                    <chakra.span>
                                        $ {marketCap.fmt} <chakra.span>on {stats.datetime}</chakra.span>
                                    </chakra.span>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                )}
            </Box>
        </Box>
    );
};
