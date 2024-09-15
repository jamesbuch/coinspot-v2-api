import { LatestPricesResponse, SingleCoinPriceResponse, BuySellPriceResponse, OpenOrdersResponse, CompletedOrdersResponse } from './types';
export declare class CoinspotPublicApi {
    getLatestPrices(): Promise<LatestPricesResponse>;
    getLatestCoinPrice(coin: string): Promise<SingleCoinPriceResponse>;
    getLatestBuyPrice(coin: string): Promise<BuySellPriceResponse>;
    getLatestSellPrice(coin: string): Promise<BuySellPriceResponse>;
    getOpenOrders(coin: string): Promise<OpenOrdersResponse>;
    getCompletedOrders(coin: string): Promise<CompletedOrdersResponse>;
}
//# sourceMappingURL=publicApi.d.ts.map