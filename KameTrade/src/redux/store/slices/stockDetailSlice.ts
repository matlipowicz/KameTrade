import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Datum, StockLogo, Profile } from "src/redux/sliceTypes";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}

const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
};

const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });

export const stockDetailApi = createApi({
    reducerPath: "stockDetailApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://twelve-data1.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getStockList: builder.query<{ data: Datum[] }, void>({
            query: () => makeRequest("/stocks?exchange=NASDAQ&format=json"),
        }),
        getStockLogo: builder.query<StockLogo, string>({
            query: (symbol) => makeRequest(`/logo?symbol=${symbol}`),
        }),
        getStockProfile: builder.query<Profile, void>({
            query: (symbol) => makeRequest(`/profile?symbol=${symbol}`),
        }),
    }),
});

export const { useGetStockListQuery } = stockDetailApi;
export const { useGetStockLogoQuery } = stockDetailApi;
export const { useGetStockProfileQuery } = stockDetailApi;
