import { useEffect, useRef, useState } from "react";
import { ColorType, createChart, ISeriesApi, Time } from "lightweight-charts";
import { Box } from "@chakra-ui/react";
import { useGetHistoricalCoinDataQuery } from "src/redux/store/slices/coinSlice";

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
    } = useGetHistoricalCoinDataQuery({ uuid: uuid as string, timePeriod: timePeriod }, { skip: !uuid || !timePeriod });

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
                // chartContainer.current.remove();
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
    }, [rangeChartData, coinHistoryLoading]);

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
