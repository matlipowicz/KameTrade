import { UnorderedList } from "@chakra-ui/react";
import { TabItem } from "./TabItem";
import { useDispatch } from "react-redux";
import { assetActions } from "src/redux/store/rootStore";

export const AssetTabs = () => {
    const dispatch = useDispatch();
    // TODO: Add some animation on tabs change
    return (
        <>
            <UnorderedList display="flex" bg="rgba(0,0,0,0.16)" w="min-content" marginLeft="0">
                <TabItem onClick={() => dispatch(assetActions.handleTabChange("coin-tab"))} title={"Coins"} id="coin-tab" />
                <TabItem onClick={() => dispatch(assetActions.handleTabChange("stock-tab"))} title={"Stocks"} id="stock-tab" />
                <TabItem onClick={() => dispatch(assetActions.handleTabChange("commodity-tab"))} title={"Commodity"} id="commodity-tab" />
            </UnorderedList>
        </>
    );
};
