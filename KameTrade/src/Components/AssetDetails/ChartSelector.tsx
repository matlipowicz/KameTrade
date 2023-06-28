import { Icon, ButtonGroup } from "@chakra-ui/react";
import { ChartButton } from "src/components/Buttons/ChartButton";
import { MdOutlineAreaChart, MdOutlineCandlestickChart } from "react-icons/md";

type ChartSelectorProps = {
    setChartType: React.Dispatch<React.SetStateAction<string>>;
    chartType: string;
};

export const ChartSelector = ({ setChartType, chartType }: ChartSelectorProps) => {
    return (
        <ButtonGroup borderWidth="0.01rem" borderRadius="0.375rem" p="0.5rem" borderColor="background.600">
            <ChartButton onClick={() => setChartType("range")} chartType={chartType} id="range">
                <Icon as={MdOutlineAreaChart} color="addition.500" w="2.5rem" h="2.5rem" />
            </ChartButton>
            <ChartButton onClick={() => setChartType("candle")} chartType={chartType} id="candle">
                <Icon as={MdOutlineCandlestickChart} color="addition.500" w="2.5rem" h="2.5rem" />
            </ChartButton>
        </ButtonGroup>
    );
};
