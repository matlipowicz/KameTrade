import { Box, Text, Icon, chakra, Table, Tbody, Tr, Th, Td, Link, Flex, Heading } from "@chakra-ui/react";
import { AiOutlineTrophy, AiOutlineDollar } from "react-icons/ai";
import { MdOutlineQueryStats } from "react-icons/md";
import {
    FaRegHandshake,
    FaTelegramPlane,
    FaReddit,
    FaGithub,
    FaBitcoin,
    FaRegFilePdf,
    FaYoutube,
    FaTwitter,
    FaDiscord,
    FaMedium,
    FaInstagram,
    FaFacebook,
} from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoLinkSharp, IoCubeOutline } from "react-icons/io5";
import { Coin } from "src/redux/sliceTypes";
import millify from "millify";
import { useState, useEffect } from "react";

//TODO: Simplify icon rendering in statistic table (map data for example)

export const AssetStatistics = ({ details, currentPrice }: { details: Coin | undefined; currentPrice: string | undefined }) => {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        if (details !== undefined) {
            const allTimeHighTimestamp: string | undefined = new Date(details?.allTimeHigh?.timestamp * 1000).toLocaleDateString();
            setDate(allTimeHighTimestamp);
        }
    }, [details]);

    return (
        <Box display="flex" justifyContent="space-around" gap="5rem" alignItems="center">
            {date !== "" && (
                <Box flex={1}>
                    <Heading size="2xl" color="addition.800">
                        Key statistics
                    </Heading>
                    <Table w="100%">
                        <Tbody>
                            <Tr>
                                <Td>{<Icon as={AiOutlineDollar} />}</Td>
                                <Th>Price to USD</Th>
                                <Td>
                                    <chakra.span>$ {Number(currentPrice).toFixed(2)}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={BiBarChartAlt2} />}</Td>
                                <Th>Rank</Th>
                                <Td>
                                    <chakra.span> {details?.rank}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={FaRegHandshake} />}</Td>
                                <Th>24h Volume</Th>
                                <Td>
                                    <chakra.span>$ {millify(Number(details?.["24hVolume"]), { precision: 3 })}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={MdOutlineQueryStats} />}</Td>
                                <Th>Market Cap</Th>
                                <Td>
                                    <chakra.span>$ {millify(Number(details?.marketCap), { precision: 3 })}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={MdOutlineQueryStats} />}</Td>
                                <Th>Dilluted Market Cap</Th>
                                <Td>
                                    <chakra.span>$ {millify(Number(details?.fullyDilutedMarketCap), { precision: 3 })}</chakra.span>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>{<Icon as={AiOutlineTrophy} />}</Td>
                                <Th>Overall Highest Price</Th>
                                <Td>
                                    <chakra.span>
                                        $ {millify(Number(details?.allTimeHigh.price), { precision: 3 })} <chakra.span>on {date}</chakra.span>
                                    </chakra.span>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            )}
            <Box flex={1}>
                <Heading size="2xl" color="addition.800">
                    Links
                </Heading>
                <Table w="100%">
                    <Tbody>
                        {details?.links.map((link: any) => (
                            <Tr key={link.url}>
                                <Td>
                                    {link.type === "website" ? (
                                        <Icon as={IoLinkSharp} />
                                    ) : link.type === "bitcointalk" ? (
                                        <Icon as={FaBitcoin} />
                                    ) : link.type === "explorer" ? (
                                        <Icon as={IoCubeOutline} />
                                    ) : link.type === "github" ? (
                                        <Icon as={FaGithub} />
                                    ) : link.type === "reddit" ? (
                                        <Icon as={FaReddit} />
                                    ) : link.type === "telegram" ? (
                                        <Icon as={FaTelegramPlane} />
                                    ) : link.type === "whitepaper" ? (
                                        <Icon as={FaRegFilePdf} />
                                    ) : link.type === "youtube" ? (
                                        <Icon as={FaYoutube} />
                                    ) : link.type === "twitter" ? (
                                        <Icon as={FaTwitter} />
                                    ) : link.type === "discord" ? (
                                        <Icon as={FaDiscord} />
                                    ) : link.type === "medium" ? (
                                        <Icon as={FaMedium} />
                                    ) : link.type === "instagram" ? (
                                        <Icon as={FaInstagram} />
                                    ) : link.type === "facebook" ? (
                                        <Icon as={FaFacebook} />
                                    ) : (
                                        ""
                                    )}
                                </Td>
                                <Th>{link.type}</Th>
                                <Td>
                                    <Link href={link.url}>{link.name}</Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};
