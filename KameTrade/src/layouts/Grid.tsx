import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

const GridLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2,1fr)" }} gridTemplateRows="repeat(3,min-content)">
            {children}
        </Grid>
        /* <SimpleGrid columns={{ base: 1, lg: 2 }}>{children}</SimpleGrid> */
    );
};

export default GridLayout;
