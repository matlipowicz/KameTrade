import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useGetHistoricalCoinDataQuery } from "src/redux/store/slices/coinSlice";

const chartOptions = {
    layout: { textColor: "white", background: { type: ColorType.Solid, color: "black" } },
    innerWidth: "100px",
    innerHeight: "100px",
};

export const RangeChart = ({ uuid, timePeriod }: { uuid: string; timePeriod: string }) => {
    const chartContainer = useRef<HTMLDivElement | null>(null);
    const [currentRangeChart, setRangeChart] = useState<ISeriesApi<"Area"> | null>(null);

    //! Coin history price call

    const {
        data: coinHistory,
        isLoading: coinHistoryLoading,
        error: coinHistoryError,
    } = useGetHistoricalCoinDataQuery({ uuid: uuid as string, timePeriod: timePeriod });

    const priceHistory = coinHistory?.data?.history;

    //! Mapped price history + sort data in ascending order
    const mappedPriceHistory = priceHistory?.map((data) => {
        return {
            time: data.timestamp as Time,
            value: Number(data.price),
        };
    });

    const rangeChartData = mappedPriceHistory?.sort((a, b) => (a.time as number) - (b.time as number));

    useEffect(() => {
        if (chartContainer && rangeChartData && !coinHistoryLoading) {
            if (currentRangeChart) {
                currentRangeChart.setData(rangeChartData);
            } else {
                const chart = createChart(chartContainer.current as HTMLElement, chartOptions);
                const areaSeries = chart.addAreaSeries({
                    lineColor: "#2962FF",
                    topColor: "#2962FF",
                    bottomColor: "rgba(41, 98, 255, 0.28)",
                });
                setRangeChart(areaSeries);
                areaSeries.setData(rangeChartData);

                chart.timeScale().fitContent();
            }
        }
    }, [rangeChartData]);

    return (
        <>
            <Box ref={chartContainer} id="chart-container" style={{ width: "120rem", height: "80rem" }}></Box>
        </>
    );
};
