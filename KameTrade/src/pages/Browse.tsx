// import { Button, Flex, Text } from "@chakra-ui/react";
// import { counterActions, RootState, AppDispatch } from "src/redux/store/rootStore";
// import { useDispatch, useSelector } from "react-redux";

import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
// import { useGetCommoditiesByPriceQuery } from "src/redux/store/slices/commoditySlice";
// import { useGetStockDataQuery, useGetStockPriceQuery } from "src/redux/store/slices/stockSlice";
// import { Chart } from "src/Components/Chart/Chart";
// import BrowseTable from "src/Components/Tables/BrowseTable";

// // TODO: Wrzucenie danych do tabeli + paginacja

// //? Czy symbole akcji zbierać w tablice?
// const Browse = () => {
//     //! RTK
//     //* COINS
//     // const { data: coins, error, isLoading } = useGetCoinsDataQuery(100);
//     const { data: coin } = useGetHistoricalCoinDataQuery({ uuid: "Qwsogvtv82FCd", timePeriod: "24h" });

//     // console.log("Coins", coins?.data.coins);

//     const coinData =
//         coin?.data?.history.map((item: { price: string; timestamp: number }) => {
//             return {
//                 value: Number(item.price),
//                 time: new Date(item.timestamp).toISOString().split("T")[0],
//             };
//         }) || [];

//     //! COMMODITY

//     // const { data: commodity } = useGetCommoditiesByPriceQuery();

//     // console.log("Commodity", commodity);
//     //! STOCKS
//     // const { data: stocks } = useGetStockDataQuery({ symbol: "aapl", interval: "1d", range: "15d" });
//     // const { data: stockPrice } = useGetStockPriceQuery("aapl");

//     return (
//         <Flex minHeight="100vh" alignItems={"center"} justifyContent={"center"} flexDirection="column" gap={5}>
//             {/* <Chart data={coinData} /> */}
//             <BrowseTable />
//         </Flex>
//     );
// };

// export default Browse;
import { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import { DataTable } from "src/Components/Tables/BrowseTable.tsx";
import { CoinDataTypes, Coins } from "src/redux/sliceTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Heading, Image } from "@chakra-ui/react";
import millify from "millify";
import { ColumnDef } from "@tanstack/react-table";

const Browse = () => {
    const { data: coins, error, isLoading } = useGetCoinsDataQuery(143);

    console.log(coins);

    // TODO: Otypuj createColumnHelper

    if (isLoading) {
        return <Heading>Loading...</Heading>;
    }
    if (error && !coins) {
        return <Heading>Error</Heading>;
    }

    const coinsData = coins?.data.coins;
    if (!coinsData) {
        return <p>Please refresh page...</p>;
    }
    return (
        <div>
            <DataTable data={coinsData} />
        </div>
    );
};

export default Browse;
