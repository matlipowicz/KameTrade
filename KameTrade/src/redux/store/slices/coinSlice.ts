import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinDataTypes, RootHistory } from "../../sliceTypes";
import { Coin, CoinPriceTypes } from "../../sliceTypes";

// TODO: Parsowanie env import meta przez config (yup)
// TODO: Nauczyc sie wiecej nt. ENV
//! ENV do gitignore
if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}
const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

//! Historical data, query types

type HistoricalArguments = {
    uuid: string;
    timePeriod: string;
};

const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });
export const coinApi = createApi({
    reducerPath: "coinApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://coinranking1.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getCoinDetails: builder.query<CoinDataTypes, { uuid: string; timePeriod: string }>({
            query: ({ uuid, timePeriod }) => makeRequest(`/coin/${uuid}?timePeriod=${timePeriod}`),
        }),
        getCoinPrice: builder.query<CoinPriceTypes, string>({
            query: (uuid) => makeRequest(`/coin/${uuid}/price`),
        }),
        getCoinsData: builder.query<CoinDataTypes, number>({
            query: (count) => makeRequest(`/coins?limit=${count}`),
        }),
        getHistoricalCoinData: builder.query<RootHistory, HistoricalArguments>({
            query: ({ uuid, timePeriod }) => makeRequest(`/coin/${uuid}/history?timePeriod=${timePeriod}`),
        }),
        getOHLCData: builder.query<any, any>({
            query: ({ uuid, timePeriod, limit }) =>
                makeRequest(`https://coinranking1.p.rapidapi.com/coin/${uuid}/ohlc?interval=${timePeriod}&limit=${limit}`),
        }),
    }),
});

export const { useGetCoinsDataQuery } = coinApi;
export const { useGetHistoricalCoinDataQuery } = coinApi;
export const { useGetCoinDetailsQuery } = coinApi;
export const { useGetCoinPriceQuery } = coinApi;
export const { useGetOHLCDataQuery } = coinApi;
