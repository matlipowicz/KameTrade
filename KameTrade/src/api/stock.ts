import axios from "axios";
import { Datum, StockLogo, Profile, StockHistory } from "src/api/types";

if (typeof import.meta.env.VITE_COINRANKING_API_KEY || import.meta.env.VITE_COINRANKING_API_KEY_TEMPORARY_REPLACEMENT === "undefined") {
    throw new Error("Please provide api key");
}

const temporaryStockYahooHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY_TEMPORARY_REPLACEMENT,
    "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
};

const stockHeaders = {
    "X-RapidAPI-Key": import.meta.env.VITE_COINRANKING_API_KEY,
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
};

const TWELVE_BASE_URL = "https://twelve-data1.p.rapidapi.com";
const YAHOO_BASE_URL = "https://yahoo-finance15.p.rapidapi.com/api/yahoo";

//! Twelve Data - API
export const twelveStockList = async () => {
    try {
        const { data } = await axios.get<Datum[]>(`${TWELVE_BASE_URL}/stocks?exchange=NASDAQ&format=json`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};

export const twelveStockLogo = async (symbol: string) => {
    try {
        const { data } = await axios.get<StockLogo>(`${TWELVE_BASE_URL}/profile?symbol=${symbol}`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};

export const twelveStockProfile = async (symbol: string) => {
    try {
        const { data } = await axios.get<Profile>(`${TWELVE_BASE_URL}/profile?symbol=${symbol}`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};

export const twelveLastQuote = async ({ symbol, interval }: { symbol: string; interval: string }) => {
    try {
        const { data } = await axios.get<Profile>(`${TWELVE_BASE_URL}/quote?symbol=${symbol}&interval=${interval}`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};

export const twelveHistoryStockData = async ({ symbol, interval, outputsize }: { symbol: string; interval: string; outputsize: string }) => {
    try {
        const { data } = await axios.get<StockHistory>(
            `${TWELVE_BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&format=json`,
            {
                headers: stockHeaders,
            }
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};

//! Yahoo Finance - API

temporaryStockYahooHeaders;

export const yahooTotalPrice = async (symbol: string) => {
    try {
        const { data } = await axios.get<StockHistory>(`${YAHOO_BASE_URL}/qu/quote/${symbol}/default-key-statistics`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};
export const yahooStockProfile = async (symbol: string) => {
    try {
        const { data } = await axios.get<StockHistory>(`${TWELVE_BASE_URL}/qu/quote/${symbol}/asset-profile`, {
            headers: stockHeaders,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};
