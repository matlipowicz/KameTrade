import { CandleChart } from "./CandleChart/CandleCoinChart";
import { RangeChart } from "./RangeChart/RangeCoinChart";
import { Box } from "@chakra-ui/react";

type ChartProps = {
    chartType: string;
    uuid: string;
    historyPeriod: string;
};

export const ChartCollection = ({ chartType, uuid, historyPeriod }: ChartProps) => {
    return (
        <>
            {uuid && chartType && (
                <Box>
                    {chartType === "range" ? (
                        <RangeChart uuid={uuid} timePeriod={historyPeriod} />
                    ) : (
                        <CandleChart uuid={uuid} timePeriod={historyPeriod} />
                    )}
                </Box>
            )}
        </>
    );
};
