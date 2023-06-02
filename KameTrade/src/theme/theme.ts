import { extendTheme } from "@chakra-ui/react";
import { fonts } from "./fonts";
import { colors } from "./colors";

export const theme = extendTheme({
    colors,
    fonts,
    styles: {
        global: () => ({
            html: {
                fontSize: "62.5%", // --> 1 rem = 10px
            },
            body: {
                bg: "background.800",
                color: "text.100",
            },
            th: {
                fontSize: "14px",
            },
        }),
    },
});
