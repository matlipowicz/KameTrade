import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}
const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "global-stock-market-api-data.p.rapidapi.com",
};
const makeRequest = (url: string) => ({ url, headers: cryptoHeaders });
export const commodityApi = createApi({
    reducerPath: "commodityApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://global-stock-market-api-data.p.rapidapi.com" }),
    endpoints: (builder) => ({
        getCommoditiesByPrice: builder.query<string, void>({
            query: () => makeRequest(`/major_commodity_by_price`),
        }),
        getCommoditiesByPerformance: builder.query<string, void>({
            query: () => makeRequest(`/major_commodity_by_performance`),
        }),
    }),
});

export const { useGetCommoditiesByPriceQuery } = commodityApi;
export const { useGetCommoditiesByPerformanceQuery } = commodityApi;
