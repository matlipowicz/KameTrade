import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { YahooRootObject } from "src/redux/sliceTypes";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}

const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
};

//! Interval (time between two data points)  /  Range (range for which data is returned)

const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });
export const stockYahooApi = createApi({
    reducerPath: "stockYahooApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://yahoo-finance15.p.rapidapi.com/api/yahoo" }),
    endpoints: (builder) => ({
        getStockTotalPrice: builder.query<YahooRootObject, string>({
            query: (symbol) => makeRequest(`/qu/quote/${symbol}/default-key-statistics`),
        }),
        getStockProfile: builder.query<any, string>({
            query: (symbol) => makeRequest(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`),
        }),
    }),
});

export const { useGetStockTotalPriceQuery } = stockYahooApi;
export const { useGetStockProfileQuery } = stockYahooApi;
