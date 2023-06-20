import { configureStore } from "@reduxjs/toolkit";
import { assetSlice } from "./slices/assetSlice";
import { coinApi } from "./slices/coinSlice";

import { stockTwelveApi } from "./slices/stockTwelve";
import { stockYahooApi } from "./slices/stockYahoo";

export const assetActions = assetSlice.actions;

export const store = configureStore({
    reducer: {
        tabs: assetSlice.reducer,
        [coinApi.reducerPath]: coinApi.reducer,
        [stockTwelveApi.reducerPath]: stockTwelveApi.reducer,
        [stockYahooApi.reducerPath]: stockYahooApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware).concat(stockTwelveApi.middleware).concat(stockYahooApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
