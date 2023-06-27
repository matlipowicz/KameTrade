import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time, UTCTimestamp } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useGetHistoryDataQuery } from "src/redux/store/slices/stockTwelve";

const chartOptions = {
    layout: { textColor: "white", fontFamily: `'Saira', sans-serif`, background: { type: ColorType.Solid, color: "rgba(0,0,0,0.1)" } },
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            visible: false,
        },
    },
    crosshair: {
        vertLine: { labelBackgroundColor: "#F89F5B" },
        horzLine: { labelBackgroundColor: "#F89F5B" },
    },
    timeScale: {
        timeVisible: true,
    },

    innerWidth: "100px",
    innerHeight: "100px",
};
// TODO: Check other assets if the data for inervarls like 5min are avaiable in every asset
export const RangeStockChart = ({ id, timePeriod }: { id: string; timePeriod: string }) => {
    const chartContainer = useRef<HTMLDivElement | null>(null);
    const [currentRangeChart, setRangeChart] = useState<ISeriesApi<"Area"> | null>(null);
    const [ohlcPeriod, setOhlcPeriod] = useState<any>({ symbol: id, interval: "1min", outputsize: 389 });

    const { data: historyPrice, isLoading: historyPriceLoading, error: historyPriceError } = useGetHistoryDataQuery(ohlcPeriod);

    const historyData = historyPrice?.values;
    //! Mapped price history + sort data in ascending order

    useEffect(() => {
        switch (timePeriod) {
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
    }, [timePeriod]);

    const mappedAreaPriceHistory = historyData?.map((data: any) => {
        return {
            time: (Date.parse(data.datetime) / 1000) as UTCTimestamp,
            value: Number(data.close),
        };
    });

    const rangeChartData = mappedAreaPriceHistory?.sort((a, b) => a.time - b.time);

    useEffect(() => {
        if (chartContainer && rangeChartData && !historyPriceLoading) {
            if (currentRangeChart) {
                currentRangeChart.setData(rangeChartData);
            } else {
                const chart = createChart(chartContainer.current as HTMLElement, chartOptions);
                const areaSeries = chart.addAreaSeries({
                    lineColor: "#6857F2",
                    topColor: "#493da9",
                    bottomColor: "rgba(104, 87, 242, 0.28)",
                });

                setRangeChart(areaSeries);
                areaSeries.setData(rangeChartData);
                chart.timeScale().fitContent();
            }
        }
    }, [rangeChartData, historyPriceLoading]);

    return (
        <>
            <Box
                ref={chartContainer}
                id="chart-container"
                style={{ width: "120rem", height: "80rem" }}
                boxShadow={"1px 21px 32px -33px rgba(0, 0, 0, 1)"}
            ></Box>
        </>
    );
};
