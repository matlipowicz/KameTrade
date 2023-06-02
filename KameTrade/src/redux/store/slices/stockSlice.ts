import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}

const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com/historic",
};

//! Interval (time between two data points)  /  Range (range for which data is returned)

// TODO: Sprawdź czy z dobrego endpointa pobierane jest info
const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });
export const stockApi = createApi({
    reducerPath: "stockApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://yahoo-finance127.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getStockData: builder.query<any, { symbol: string; interval: string; range: string }>({
            query: ({ symbol, interval, range }) => makeRequest(`/historic/${symbol}/${interval}/${range}`),
        }),
        getStockPrice: builder.query<any, string>({
            query: (symbol) => makeRequest(`/price/${symbol}`),
        }),
    }),
});

export const { useGetStockDataQuery } = stockApi;
export const { useGetStockPriceQuery } = stockApi;
