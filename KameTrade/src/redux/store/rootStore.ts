import { configureStore } from "@reduxjs/toolkit";
import { assetSlice } from "./slices/assetSlice";
import { coinApi } from "./slices/coinSlice";
import { commodityApi } from "./slices/commoditySlice";
import { stockDetailApi } from "./slices/stockDetailSlice";
import { stockApi } from "./slices/stockSlice";

export const assetActions = assetSlice.actions;

export const store = configureStore({
    reducer: {
        tabs: assetSlice.reducer,
        [coinApi.reducerPath]: coinApi.reducer,
        [commodityApi.reducerPath]: commodityApi.reducer,
        [stockApi.reducerPath]: stockApi.reducer,
        [stockDetailApi.reducerPath]: stockDetailApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(coinApi.middleware)
            .concat(commodityApi.middleware)
            .concat(stockApi.middleware)
            .concat(stockDetailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
