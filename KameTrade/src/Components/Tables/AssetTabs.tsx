import { UnorderedList } from "@chakra-ui/react";
import { TabItem } from "./TabItem";
import { TableTabContext } from "src/context/TableTab";
import { useContext } from "react";

export const AssetTabs = () => {
    const { setAssetTab } = useContext(TableTabContext);

    return (
        <>
            <UnorderedList display="flex" bg="rgba(0,0,0,0.16)" w="min-content" marginLeft="0">
                <TabItem onClick={() => setAssetTab("coin-tab")} title={"Coins"} id="coin-tab" />
                <TabItem onClick={() => setAssetTab("stock-tab")} title={"Stocks"} id="stock-tab" />
            </UnorderedList>
        </>
    );
};
