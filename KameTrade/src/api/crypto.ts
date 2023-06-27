import axios from "axios";
import { CoinsData, CoinDataTypes, Coin, AllTimeHigh, HistoryData, CoinObject, CoinPriceTypes } from "src/api/types";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY === "undefined") {
    throw new Error("Please provide api key");
}
const cryptoHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    "Content-Type": "application/json",
};

const BASE_URL = "https://coinranking1.p.rapidapi.com";

// TODO: add types to get

export const coinsData = async (limit: number) => {
    try {
        const { data } = await axios.get<CoinDataTypes>(`${BASE_URL}/coins?limit=${limit}`, {
            headers: cryptoHeaders,
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};
export const coinDetails = async ({ uuid, timePeriod }: { uuid: string; timePeriod: string }) => {
    try {
        const { data } = await axios.get<CoinObject>(`${BASE_URL}/coin/${uuid}?timePeriod=${timePeriod}`, {
            headers: cryptoHeaders,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const coinPrice = async (uuid: string) => {
    try {
        const { data } = await axios.get<CoinPriceTypes>(`${BASE_URL}/coin/${uuid}/price`, {
            headers: cryptoHeaders,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const historyCoinData = async ({ uuid, timePeriod }: { uuid: string; timePeriod: string }) => {
    try {
        const { data } = await axios.get<any>(`${BASE_URL}/coin/${uuid}/history?timePeriod=${timePeriod}`, {
            headers: cryptoHeaders,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const OHLCData = async ({ uuid, timePeriod, limit }: { uuid: string; timePeriod: string; limit: number }) => {
    try {
        const { data } = await axios.get<any>(`${BASE_URL}/coin/${uuid}/ohlc?interval=${timePeriod}&limit=${limit}`, {
            headers: cryptoHeaders,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
