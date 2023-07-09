import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, UTCTimestamp } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { StockHistory } from "src/api/types";

type RangeChartProps = {
    id: string;
    timePeriod: string;
    rangeChartData:
        | {
              time: UTCTimestamp;
              value: number;
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

export const RangeStockChart = ({ id, timePeriod, rangeChartData, historyPriceLoading, historyPrice }: RangeChartProps) => {
    const chartContainer = useRef<HTMLDivElement | null>(null);
    const [currentRangeChart, setRangeChart] = useState<ISeriesApi<"Area"> | null>(null);

    useEffect(() => {
        if(rangeChartData){
            const handleResize = () => {
                chart.applyOptions({ width: chartContainer.current?.clientWidth });
        };
            const chart = createChart(chartContainer.current as HTMLElement, chartOptions);
            const areaSeries = chart.addAreaSeries({
                lineColor: "#6857F2",
                topColor: "#493da9",
                bottomColor: "rgba(104, 87, 242, 0.28)",
            });

            setRangeChart(areaSeries);
            areaSeries.setData(rangeChartData);
            chart.timeScale().fitContent();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        }
    }, [historyPrice]);

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
