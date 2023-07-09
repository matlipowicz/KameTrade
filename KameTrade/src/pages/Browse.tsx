import { BrowseTable } from "src/components/Tables/BrowseTable";
import { useState } from "react";
import { TabsProvider } from "src/context/TableTab";
const Browse = () => {
    return (
        <>
            <TabsProvider>
                <BrowseTable />
            </TabsProvider>
        </>
    );
};
export default Browse;
