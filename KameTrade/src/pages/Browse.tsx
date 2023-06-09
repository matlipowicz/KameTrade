import { useEffect, useState } from "react";
import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import { useGetStockDataQuery } from "src/redux/store/slices/stockSlice";
import { useGetStockListQuery } from "src/redux/store/slices/stockDetailSlice";
import { useGetStockPriceQuery } from "src/redux/store/slices/stockSlice";
import { useGetStockProfileQuery } from "src/redux/store/slices/stockDetailSlice";
import { useGetCommoditiesByPriceQuery } from "src/redux/store/slices/commoditySlice";
import { BrowseTable } from "src/Components/Tables/BrowseTable.tsx";
import { Box, HStack, Heading, Spinner, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

const Browse = () => {
    //! COINS DATA

    //! COMMODITIES DATA
    const { data: commodities } = useGetCommoditiesByPriceQuery();

    //! Stock
    // List
    // const { data: stockList } = useGetStockListQuery();
    // const { data: test } = useGetStockProfileQuery();

    // console.log("Stock", stockList);
    // const listOfStockNames = stockList?.data;

    // Data for table

    // if (!commodities || !coinsData || isFetching) {
    //     return (
    //         <>
    //             <HStack h="100%" display="flex" justifyContent="center" alignItems="center" p="8rem">
    //                 <Box h="85.1rem" w="136.2rem" bg="rgba(0,0,0,0.16)" display="flex" justifyContent="center" alignItems="center">
    //                     <Spinner color="addition.100" emptyColor="background.500" thickness="0.5rem" speed="0.75s" size="xl" />
    //                 </Box>
    //             </HStack>
    //         </>
    //     );
    // }

    return (
        <>
            <BrowseTable />
        </>
    );
};

export default Browse;
