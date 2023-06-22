import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/rootStore";
import { Box, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { AssetTabs } from "src/components/Tables/AssetTabs";
import { Coins } from "./TableAssets/Coins";
import { Stocks } from "./TableAssets/Stocks";

// import { Filter } from "./TableAssets/Coins";

// TODO: errors + coinsData types + shrink size of code lines to smaller chunks
// TODO: Set type for coinsData

export function BrowseTable() {
    const [cryptoGlobalFilter, setCryptoGlobalFilter] = useState("");
    const [stockGlobalFilter, setStockGlobalFilter] = useState("");
    let assetType: any = useSelector((state: RootState) => {
        return state.tabs.assetType;
    });

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                paddingTop="clamp(6rem,6vh,10rem)"
                paddingBottom="clamp(6rem,6vh,10rem)"
                paddingRight="clamp(6rem,10vh,12rem)"
                paddingLeft="clamp(6rem,10vh,12rem)"
                as="section"
                position="relative"
            >
                <Flex w="100%" justifyContent="space-between" flexDir="row">
                    <Box>
                        <AssetTabs />
                    </Box>
                    {/* <Box as="form" display="flex" alignItems="center" gap="1rem">
                        <FormLabel fontSize="1.6rem">Search</FormLabel>
                        <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} h="100%" maxW="20rem" fontSize="1.6rem" />
                    </Box> */}
                </Flex>

                <Box w="100%">
                    {assetType === "coin-tab" ? (
                        <Coins globalFilter={cryptoGlobalFilter} setGlobalFilter={setCryptoGlobalFilter} />
                    ) : (
                        (assetType = "stock-tab" ? (
                            <Stocks globalFilter={stockGlobalFilter} setGlobalFilter={setStockGlobalFilter} />
                        ) : (
                            <div>No data available</div>
                        ))
                    )}
                </Box>
            </Box>
        </>
    );
}
