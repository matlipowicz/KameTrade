import { useGetCoinsDataQuery } from "src/redux/store/slices/coinSlice";
import { DataTable } from "src/Components/Tables/BrowseTable.tsx";
import { Heading } from "@chakra-ui/react";

const Browse = () => {
    const { data: coins, error, isLoading } = useGetCoinsDataQuery(500);

    if (isLoading) {
        return <Heading>Loading...</Heading>;
    }
    if (error && !coins) {
        return <Heading>Error</Heading>;
    }

    const coinsData = coins?.data.coins;
    if (!coinsData) {
        return <p>Please refresh page...</p>;
    }
    return (
        <div>
            <DataTable data={coinsData} />
        </div>
    );
};

export default Browse;
