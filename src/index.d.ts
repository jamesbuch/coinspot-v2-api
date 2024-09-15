import { CoinspotPublicApi } from './publicApi';
import { AuthenticatedCoinspotReadOnlyApi } from './authenticatedReadOnlyApi';
import { AuthenticatedCoinspotApi } from './authenticatedApi';
export * from './types';
export declare class Coinspot {
    readonly public: CoinspotPublicApi;
    readonly readOnly: AuthenticatedCoinspotReadOnlyApi | null;
    readonly authenticated: AuthenticatedCoinspotApi | null;
    private apiKeyRequiredMessage;
    constructor(apiKey?: string, apiSecret?: string);
    latestCoinPrice(coin: string): Promise<import("./types").SingleCoinPriceResponse>;
    latestPrices(): Promise<import("./types").LatestPricesResponse>;
    latestBuyPrice(coin: string): Promise<import("./types").BuySellPriceResponse>;
    latestSellPrice(coin: string): Promise<import("./types").BuySellPriceResponse>;
    openOrderList(coin: string): Promise<import("./types").OpenOrdersResponse>;
    completedOrderList(coin: string): Promise<import("./types").CompletedOrdersResponse>;
    coinBalance(coin: string): Promise<import("./types").SingleCoinBalanceResponse>;
    balance(): Promise<import("./types").BalancesResponse>;
    coinDepositAddress(coin: string): Promise<import("./types").CoinDepositAddressResponse>;
    marketBuyOrder(coin: string, amount: number, rate: number): Promise<import("./types").PlaceOrderResponse>;
    marketSellOrder(coin: string, amount: number, rate: number): Promise<import("./types").PlaceOrderResponse>;
}
export declare const createCoinspotApi: (apiKey?: string, apiSecret?: string) => Coinspot;
export default Coinspot;
//# sourceMappingURL=index.d.ts.map