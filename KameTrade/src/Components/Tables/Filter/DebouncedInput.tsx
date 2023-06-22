import { useEffect } from "react";
import { useState } from "react";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string | number;
    onChange: (val: string | number) => void;
    debounceTime?: number;
}
//? Debounced input opoznia dzialanie filtra, poniewaz under the hood dzieje sie duzo, to ma zapobiegac crashowaniu i spowalnianiu apki przy przefiltrowywaniu tabeli. Tutaj czekamy az user wpisze slowo lub jego czesc i dopiero wykonujemy filter.
export const DebouncedInput = ({ value: initialValue, onChange, debounceTime = 300, ...props }: Props) => {
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

    return <input value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
};
