import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AssetState = {
    assetType: string;
};

const initialState: AssetState = {
    assetType: "coin-tab",
};
export const assetSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        handleTabChange(state: any, action: PayloadAction<string>) {
            state.assetType = action.payload;
        },
    },
});
