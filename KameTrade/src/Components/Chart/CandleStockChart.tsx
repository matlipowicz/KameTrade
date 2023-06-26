import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useGetHistoryDataQuery } from "src/redux/store/slices/stockTwelve";
import { UTCTimestamp } from "lightweight-charts";

// TODO: Dopracuj wykresy, aby przy każdej zmianie okresu zmieniały się jednocześnie

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

export const CandleStockChart = ({ id, timePeriod }: { id: string; timePeriod: string }) => {
    const candleChartContainer = useRef<HTMLDivElement | null>(null);
    const [currentCandleChart, setCandleChart] = useState<ISeriesApi<"Candlestick"> | null>(null);
    const [ohlcPeriod, setOhlcPeriod] = useState<any>({ symbol: id, interval: "1min", outputsize: 389 });

    const {
        data: historyPrice,
        isLoading: historyPriceLoading,
        error: historyPriceError,
    } = useGetHistoryDataQuery(ohlcPeriod, { skip: !id || !timePeriod });

    const historyData = historyPrice?.values;

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
        switch (timePeriod) {
            case "24h":
                setOhlcPeriod({ symbol: id, interval: "1min", outputsize: 389 });
                break;
            case "7d":
                setOhlcPeriod({ symbol: id, interval: "5min", outputsize: 389 });
                break;
            case "30d":
                setOhlcPeriod({ symbol: id, interval: "30min", outputsize: 246 });
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

    //! Coin history price call

    useEffect(() => {
        if (candleChartContainer && candleChartData && !historyPriceLoading) {
            if (currentCandleChart) {
                currentCandleChart.setData(candleChartData);
            } else {
                const chart = createChart(candleChartContainer.current as HTMLElement, chartOptions);

                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: "#26a69a",
                    downColor: "#ef5350",
                    borderVisible: false,
                    wickUpColor: "#26a69a",
                    wickDownColor: "#ef5350",
                });
                setCandleChart(candlestickSeries);
                candlestickSeries.setData(candleChartData);
                chart.timeScale().fitContent();
            }
        }
    }, [candleChartData]);

    return (
        <>
            <Box ref={candleChartContainer} id="chart-container" style={{ width: "120rem", height: "80rem" }}></Box>
        </>
    );
};
