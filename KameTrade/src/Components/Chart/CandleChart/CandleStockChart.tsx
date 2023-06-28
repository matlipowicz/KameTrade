import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time, UTCTimestamp } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { StockHistory } from "src/api/types";

type CandleChartProps = {
    id: string;
    timePeriod: string;
    candleChartData:
        | {
              time: UTCTimestamp;
              open: number;
              high: number;
              low: number;
              close: number;
          }[]
        | undefined;
    historyPriceLoading: boolean;
    historyPrice: StockHistory | undefined;
};

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

export const CandleStockChart = ({ id, timePeriod, candleChartData, historyPriceLoading, historyPrice }: CandleChartProps) => {
    const candleChartContainer = useRef<HTMLDivElement | null>(null);
    const [currentCandleChart, setCandleChart] = useState<ISeriesApi<"Candlestick"> | null>(null);

    useEffect(() => {
        if (candleChartContainer && candleChartData && !historyPriceLoading) {
            if (currentCandleChart) {
                currentCandleChart.setData(candleChartData);
            } else {
                let chart = createChart(candleChartContainer.current as HTMLElement, chartOptions);

                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: "#26a69a",
                    downColor: "#ef5350",
                    borderVisible: false,
                    wickUpColor: "#26a69a",
                    wickDownColor: "#ef5350",
                });
                setCandleChart(candlestickSeries);
                chart.timeScale().fitContent();
                candlestickSeries.setData(candleChartData);
            }
        }
    }, [historyPrice]);

    return (
        <>
            <Box ref={candleChartContainer} id="chart-container" style={{ width: "120rem", height: "80rem" }}></Box>
        </>
    );
};
