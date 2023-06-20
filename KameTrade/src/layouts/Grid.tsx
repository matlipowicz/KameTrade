import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

export const GridLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gridTemplateRows="auto,1fr,auto" minH="100vh" alignItems="center">
            {children}
        </Grid>
        /* <SimpleGrid columns={{ base: 1, lg: 2 }}>{children}</SimpleGrid> */
    );
};
