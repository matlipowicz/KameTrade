import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { coinApi } from "./slices/coinSlice";
import { commodityApi } from "./slices/commoditySlice";
import { stockApi } from "./slices/stockSlice";

export const counterActions = counterSlice.actions;

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        [coinApi.reducerPath]: coinApi.reducer,
        [commodityApi.reducerPath]: commodityApi.reducer,
        [stockApi.reducerPath]: stockApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware).concat(commodityApi.middleware).concat(stockApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
