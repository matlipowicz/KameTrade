export interface CoinDataTypes {
    data: CoinsData;
    status: string;
}

export interface CoinPriceTypes {
    status: string;
    data: {
        price: string;
        timestamp: number;
    };
}

export interface CoinsData {
    coins: Coins[];
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

export interface CoinObject {
    data: CoinData;
    status: string;
}

export interface CoinData {
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
    data: HistoryData;
    status: string;
}

export interface HistoryData {
    change: string;
    history: History[];
}

export interface History {
    price: string;
    timestamp: number;
}

export interface OHLCDataTypes {
    status: string;
    data: OHLCDataCoin;
}

export interface OHLCDataCoin {
    ohlc: OHLCObjectData[];
}

export interface OHLCObjectData {
    startingAt: number;
    endingAt: number;
    open: string;
    high: string;
    low: string;
    close: string;
    avg: string;
}

// Stock List

export interface RootStockListObject {
    data: Datum[];
    status: string;
}

export interface StockHistory {
    meta: Datum;
    values: HistoryValues[];
    status: string;
}

export interface HistoryValues {
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
}
export interface Datum {
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
}
export interface Stocks {
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

// Yahoo - stocks
export interface YahooStatisticsRootObject {
    defaultKeyStatistics: DefaultKeyStatistics;
}

export interface DefaultKeyStatistics {
    "52WeekChange": The52_WeekChange;
    SandP52WeekChange: The52_WeekChange;
    annualHoldingsTurnover: any[];
    annualReportExpenseRatio: any[];
    beta: The52_WeekChange;
    beta3Year: any[];
    bookValue: The52_WeekChange;
    category: null;
    dateShortInterest: The52_WeekChange;
    earningsQuarterlyGrowth: any[];
    enterpriseToEbitda: The52_WeekChange;
    enterpriseToRevenue: The52_WeekChange;
    enterpriseValue: EnterpriseValue;
    fiveYearAverageReturn: any[];
    floatShares: EnterpriseValue;
    forwardEps: The52_WeekChange;
    forwardPE: The52_WeekChange;
    fundFamily: null;
    fundInceptionDate: any[];
    heldPercentInsiders: The52_WeekChange;
    heldPercentInstitutions: The52_WeekChange;
    impliedSharesOutstanding: EnterpriseValue;
    lastCapGain: any[];
    lastDividendDate: The52_WeekChange;
    lastDividendValue: The52_WeekChange;
    lastFiscalYearEnd: The52_WeekChange;
    lastSplitDate: any[];
    lastSplitFactor: null;
    legalType: null;
    maxAge: number;
    morningStarOverallRating: any[];
    morningStarRiskRating: any[];
    mostRecentQuarter: The52_WeekChange;
    netIncomeToCommon: EnterpriseValue;
    nextFiscalYearEnd: The52_WeekChange;
    pegRatio: The52_WeekChange;
    priceHint: EnterpriseValue;
    priceToBook: The52_WeekChange;
    priceToSalesTrailing12Months: any[];
    profitMargins: The52_WeekChange;
    revenueQuarterlyGrowth: any[];
    sharesOutstanding: EnterpriseValue;
    sharesPercentSharesOut: The52_WeekChange;
    sharesShort: EnterpriseValue;
    sharesShortPreviousMonthDate: The52_WeekChange;
    sharesShortPriorMonth: EnterpriseValue;
    shortPercentOfFloat: any[];
    shortRatio: The52_WeekChange;
    threeYearAverageReturn: any[];
    totalAssets: any[];
    trailingEps: The52_WeekChange;
    yield: any[];
    ytdReturn: any[];
}

export interface The52_WeekChange {
    fmt: string;
    raw: number;
}

export interface EnterpriseValue {
    fmt: null | string;
    longFmt: string;
    raw: number;
}
