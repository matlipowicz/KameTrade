import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Datum, StockLogo, Profile, StockHistory } from "src/redux/sliceTypes";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}

const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
};

const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });

// TODO: Change multiple queries as one
export const stockTwelveApi = createApi({
    reducerPath: "stockTwelveApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://twelve-data1.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getStockList: builder.query<{ data: Datum[] }, void>({
            query: () => makeRequest("/stocks?exchange=NASDAQ&format=json"),
        }),
        getStockLogo: builder.query<StockLogo, string>({
            query: (symbol) => makeRequest(`/logo?symbol=${symbol}`),
        }),
        getStockProfile: builder.query<Profile, string>({
            query: (symbol) => makeRequest(`/profile?symbol=${symbol}`),
        }),
        getStockLastQuote: builder.query<Profile, { symbol: string; interval: string }>({
            query: ({ symbol, interval }) => makeRequest(`/quote?symbol=${symbol}&interval=${interval}&format=json`),
        }),
        getHistoryData: builder.query<StockHistory, { symbol: string; interval: string; outputsize: string }>({
            query: ({ symbol, interval, outputsize }) =>
                makeRequest(`/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&format=json`),
        }),
    }),
});

export const { useGetStockListQuery } = stockTwelveApi;
export const { useGetStockLogoQuery } = stockTwelveApi;
export const { useGetStockProfileQuery } = stockTwelveApi;
export const { useGetStockLastQuoteQuery } = stockTwelveApi;
export const { useGetHistoryDataQuery } = stockTwelveApi;
