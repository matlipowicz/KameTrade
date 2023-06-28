import { CandleStockChart } from "./CandleChart/CandleStockChart";
import { RangeStockChart } from "./RangeChart/RangeStockChart";
import { Box } from "@chakra-ui/react";
import { UTCTimestamp } from "lightweight-charts";
import { twelveHistoryStockData } from "src/api/stock";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { StockHistory } from "src/redux/sliceTypes";

type ChartProps = {
    chartType: string;
    id: string;
    historyPeriod: string;
};

type RangeChartProps = {
    rangeChartData:
        | {
              time: UTCTimestamp;
              value: number;
          }[]
        | undefined;
};

export const StockCharts = ({ chartType, id, historyPeriod }: ChartProps) => {
    const [ohlcPeriod, setOhlcPeriod] = useState<{ symbol: string; interval: string; outputsize: number }>({
        symbol: id,
        interval: "1min",
        outputsize: 389,
    });

    const {
        data: historyPrice,
        isLoading: historyPriceLoading,
        error: historyPriceError,
    } = useQuery({
        queryKey: ["time_series", { ohlcPeriod }],
        queryFn: () => twelveHistoryStockData(ohlcPeriod),
    });

    const historyData = historyPrice?.values;

    //! Range chart
    const mappedAreaPriceHistory = historyData?.map((data) => {
        return {
            time: (Date.parse(data.datetime) / 1000) as UTCTimestamp,
            value: Number(data.close),
        };
    });

    const rangeChartData = mappedAreaPriceHistory?.sort((a, b) => a.time - b.time);

    //! Candlestick chart
    const mappedCandleStickData = historyData?.map((data: any) => {
        return {
            time: (Date.parse(data.datetime) / 1000) as UTCTimestamp,
            open: Number(data.open),
            high: Number(data.high),
            low: Number(data.low),
            close: Number(data.close),
        };
    });
    const candleChartData = mappedCandleStickData?.sort((a, b) => a.time - b.time);

    useEffect(() => {
        switch (historyPeriod) {
            case "24h":
                setOhlcPeriod({ symbol: id, interval: "1min", outputsize: 389 });
                break;
            case "7d":
                setOhlcPeriod({ symbol: id, interval: "5min", outputsize: 389 });
                break;
            case "30d":
                setOhlcPeriod({ symbol: id, interval: "30min", outputsize: 247 });
                break;
            case "3m":
                setOhlcPeriod({ symbol: id, interval: "1day", outputsize: 63 });
                break;
            case "1y":
                setOhlcPeriod({ symbol: id, interval: "1week", outputsize: 53 });
                break;
            case "3y":
                setOhlcPeriod({ symbol: id, interval: "1week", outputsize: 158 });
                break;
            case "5y":
                setOhlcPeriod({ symbol: id, interval: "1week", outputsize: 262 });
        }
    }, [historyPeriod]);
    return (
        <>
            {id && chartType && (
                <Box>
                    {chartType === "range" ? (
                        <RangeStockChart
                            id={id}
                            timePeriod={historyPeriod}
                            rangeChartData={rangeChartData}
                            historyPriceLoading={historyPriceLoading}
                            historyPrice={historyPrice}
                        />
                    ) : (
                        <CandleStockChart
                            id={id}
                            timePeriod={historyPeriod}
                            candleChartData={candleChartData}
                            historyPriceLoading={historyPriceLoading}
                            historyPrice={historyPrice}
                        />
                    )}
                </Box>
            )}
        </>
    );
};
