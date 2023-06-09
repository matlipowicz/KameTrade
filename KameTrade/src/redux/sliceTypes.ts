export interface CoinDataTypes {
    data: Data;
    status: string;
}

export interface Data {
    coins: Coin[];
    stats: Stats;
}

export interface Coins {
    "24hVolume": string;
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: null | string;
    iconUrl: string;
    listedAt: number;
    lowVolume: boolean;
    marketCap: string;
    name: string;
    price: string;
    rank: number;
    sparkline: string[];
    symbol: string;
    tier: number;
    uuid: string;
}

export interface Stats {
    total: number;
    total24hVolume: string;
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: string;
    totalMarkets: number;
}

// Coin

export interface RootObject {
    data: Data;
    status: string;
}

export interface Data {
    coin: Coin;
}

export interface Coin {
    "24hVolume": string;
    allTimeHigh: AllTimeHigh;
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: string | null;
    description: string;
    fullyDilutedMarketCap: string;
    hasContent: boolean;
    iconUrl: string;
    links: Link[];
    listedAt: number;
    lowVolume: boolean;
    marketCap: string;
    name: string;
    notices: null;
    numberOfExchanges: number;
    numberOfMarkets: number;
    price: string;
    priceAt: number;
    rank: number;
    sparkline: string[];
    supply: Supply;
    symbol: string;
    tags: string[];
    tier: number;
    uuid: string;
    websiteUrl: string;
}

export interface AllTimeHigh {
    price: string;
    timestamp: number;
}

export interface Link {
    name: string;
    type: string;
    url: string;
}

export interface Supply {
    circulating: string;
    confirmed: boolean;
    max: string;
    supplyAt: number;
    total: string;
}

// Coin price history

export interface RootHistory {
    data: Data;
    status: string;
}

export interface Data {
    change: string;
    history: History[];
}

export interface History {
    price: string;
    timestamp: number;
}

// Stock List

export interface RootStockListObject {
    data: Datum[];
    status: string;
}

export interface Datum {
    country: string;
    currency: string;
    exchange: string;
    mic_code: string;
    name: string;
    symbol: string;
    type: string;
}

// Stock details

export interface Profile {
    CEO: string;
    address: string;
    city: string;
    country: string;
    description: string;
    employees: number;
    exchange: string;
    industry: string;
    mic_code: string;
    name: string;
    phone: string;
    sector: string;
    state: string;
    symbol: string;
    type: string;
    website: string;
    zip: string;
}
// Stock logo
export interface StockLogo {
    symbol: string;
    url: string;
}

// Commodities
export interface Commodity {
    change: string;
    changePercentage: string;
    high: string;
    last: string;
    low: string;
    name: string;
    time: string;
}
