import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useGetOHLCDataQuery } from "src/redux/store/slices/coinSlice";
import { OHLCData } from "src/api/crypto";
import { useQuery } from "@tanstack/react-query";
import { CandlestickData } from "lightweight-charts";

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

export const CandleChart = ({ uuid, timePeriod }: { uuid: string; timePeriod: string }) => {
    const candleChartContainer = useRef<HTMLDivElement | null>(null);
    const [currentCandleChart, setCandleChart] = useState<ISeriesApi<"Candlestick"> | null>(null);
    const [ohlcPeriod, setOhlcPeriod] = useState<any>({ uuid: uuid, timePeriod: "minute", limit: "1440" });

    //! OHLC data call

    const {
        data: ohlcData,
        isLoading: ohlcDataLoading,
        error: ohlcDataError,
    } = useQuery({
        queryKey: ["coinHistory", { uuid: uuid, timePeriod: timePeriod }],
        queryFn: () => OHLCData(ohlcPeriod),
    });
    const candleStickData = ohlcData?.data.ohlc;

    const mappedCandleStickData = candleStickData?.map((data) => {
        return {
            time: data.endingAt as Time,
            open: Number(data.open),
            high: Number(data.high),
            low: Number(data.low),
            close: Number(data.close),
        };
    });
    const candleChartData = mappedCandleStickData?.sort((a, b) => (a.time as number) - (b.time as number));

    useEffect(() => {
        switch (timePeriod) {
            case "24h":
                setOhlcPeriod({ uuid: uuid, timePeriod: "minute", limit: "1440" });
                break;
            case "7d":
                setOhlcPeriod({ uuid: uuid, timePeriod: "hour", limit: "168" });
                break;
            case "30d":
                setOhlcPeriod({ uuid: uuid, timePeriod: "hour", limit: "720" });
                break;
            case "3m":
                setOhlcPeriod({ uuid: uuid, timePeriod: "8hours", limit: "272" });
                break;
            case "1y":
                setOhlcPeriod({ uuid: uuid, timePeriod: "day", limit: "365" });
                break;
            case "3y":
                setOhlcPeriod({ uuid: uuid, timePeriod: "day", limit: "1097" });
                break;
            case "5y":
                setOhlcPeriod({ uuid: uuid, timePeriod: "day", limit: "1827" });
        }
    }, [timePeriod]);

    //! Coin history price call

    useEffect(() => {
        if (candleChartContainer && candleChartData && !ohlcDataLoading) {
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
    }, [ohlcData]);

    return (
        <>
            <Box ref={candleChartContainer} id="chart-container" style={{ width: "120rem", height: "80rem" }}></Box>
        </>
    );
};
