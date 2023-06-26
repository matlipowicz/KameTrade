import { useEffect } from "react";
import { useState } from "react";
import { Input, InputGroup, InputLeftElement, Icon, Stack } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string | number;
    onChange: (val: string | number) => void;
    debounceTime?: number;
    placeholder: string;
}
//? Debounced input opoznia dzialanie filtra, poniewaz under the hood dzieje sie duzo, to ma zapobiegac crashowaniu i spowalnianiu apki przy przefiltrowywaniu tabeli. Tutaj czekamy az user wpisze slowo lub jego czesc i dopiero wykonujemy filter.
export const DebouncedInput = ({ value: initialValue, onChange, debounceTime = 300, placeholder }: Props) => {
    const [value, setValue] = useState(initialValue);

    // setValue if any initialValue changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // debounce onChange — triggered on every keypress
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounceTime);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, onChange, debounceTime]);

    return (
        <Stack>
            <InputGroup alignSelf="end">
                <InputLeftElement h="100%">
                    <Search2Icon boxSize="fit-content" marginLeft="3rem" w="2rem" color="addition.185" />
                </InputLeftElement>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    type="text"
                    size="lg"
                    minW="30rem"
                    fontSize="1.8rem"
                    padding="2.5rem 5rem"
                    borderRadius="0.375rem 0.375rem 0 0 "
                    borderColor="addition.700"
                    borderWidth="0.2rem"
                    _hover={{ borderColor: "addition.700" }}
                    _placeholder={{ color: "background.200" }}
                    focusBorderColor="addition.700"
                    variant="outline"
                    borderBottom="none"
                />
                ;
            </InputGroup>
        </Stack>
    );
};
