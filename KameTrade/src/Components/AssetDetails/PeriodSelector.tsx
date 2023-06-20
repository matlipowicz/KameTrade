import { Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export const PeriodSelector = ({
    value,
    onChange,
    periods,
}: {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    periods: string[];
}) => {
    return (
        <>
            <Text>Choose Period</Text>
            <Select value={value} onChange={onChange} w="" alignSelf="end">
                {periods.map((period) => {
                    return (
                        <option key={period} value={period}>
                            {period}
                        </option>
                    );
                })}
            </Select>
        </>
    );
};
