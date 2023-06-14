import { useGetStockLogoQuery, useGetStockProfileQuery, useGetStockLastQuoteQuery, useGetHistoryDataQuery } from "src/redux/store/slices/stockTwelve";
import { useGetStockTotalPriceQuery } from "src/redux/store/slices/stockYahoo";
import { useParams } from "react-router-dom";

// TODO: Create outputsize(period in days to get historical data)
// TODO:

export const StockDetails = () => {
    // const { id } = useParams();
    // const { data: stockLogo, isFetching: stockLogoFetching, error: stockLogoError } = useGetStockLogoQuery(id as string);
    // const { data: stockProfile, isFetching: stockProfileFetching, error: stockProfileError } = useGetStockProfileQuery(id as string);
    // const {
    //     data: stockStatistics,
    //     isFetching: stockStatisticsFetching,
    //     error: stockStatisticsError,
    // } = useGetStockLastQuoteQuery({ symbol: id as string, interval: "1day" });
    // const {
    //     data: stockHistory,
    //     isFetching: stockHistoryFetching,
    //     error: stockHistoryError,
    // } = useGetHistoryDataQuery({ symbol: id as string, interval: "1day", outputsize: "1" });
    // const { data: stockTotalPrice, isFetching: stockTotalPriceFetching, error: stockTotalPriceError } = useGetStockTotalPriceQuery(id as string);

    // // Asset info
    // const logo = stockLogo?.url;
    // const profile = stockProfile;
    // const statisticData = stockStatistics;
    // const historyPrice = stockHistory?.values.at(0);
    // const marketCap = stockTotalPrice?.defaultKeyStatistics.enterpriseValue;

    // console.log(historyPrice);

    return <div>Stocks</div>;
};
