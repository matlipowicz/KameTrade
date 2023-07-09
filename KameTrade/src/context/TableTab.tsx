import { useState } from "react";
import { createContext } from "react";

export type AssetTabType = {
    assetTab: string;
    setAssetTab: React.Dispatch<React.SetStateAction<string>>;
};

export const TableTabContext = createContext<AssetTabType>({ assetTab: "coin-tab", setAssetTab: () => {} });

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [assetTab, setAssetTab] = useState<string>("coin-tab");

    return <TableTabContext.Provider value={{ assetTab, setAssetTab }}>{children}</TableTabContext.Provider>;
};
