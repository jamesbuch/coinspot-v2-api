// src/index.ts

import { CoinspotPublicApi } from './publicApi';
import { AuthenticatedCoinspotReadOnlyApi } from './authenticatedReadOnlyApi';
import { AuthenticatedCoinspotApi } from './authenticatedApi';

export * from './types';

export class Coinspot {

    public readonly public: CoinspotPublicApi;
    public readonly readOnly: AuthenticatedCoinspotReadOnlyApi;
    public readonly authenticated: AuthenticatedCoinspotApi;

    private apiKeyRequiredMessage = 'API key and secret are required for authenticated operations';

    constructor(apiKey?: string, apiSecret?: string) {
        this.public = new CoinspotPublicApi();

        if (apiKey && apiSecret) {
            this.readOnly = new AuthenticatedCoinspotReadOnlyApi(apiKey, apiSecret);
            this.authenticated = new AuthenticatedCoinspotApi(apiKey, apiSecret);
        } else {
            this.readOnly = null as any;
            this.authenticated = null as any;
        }
    }

    // ========================================================================
    // Public API
    // ========================================================================

    async latestCoinPrice(coin: string) {
        return this.public.getLatestCoinPrice(coin);
    }

    async latestPrices() {
        return this.public.getLatestPrices();
    }

    async latestBuyPrice(coin: string) {
        return this.public.getLatestBuyPrice(coin);
    }

    async latestSellPrice(coin: string) {
        return this.public.getLatestSellPrice(coin);
    }

    async openOrderList(coin: string) {
        return this.public.getOpenOrders(coin);
    }

    async completedOrderList(coin: string) {
        return this.public.getCompletedOrders(coin);
    }


    // ========================================================================
    // Authenticated Read-Only API
    // ========================================================================

    async coinBalance(coin: string) {
        if (!this.readOnly) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.readOnly.getSingleCoinBalance(coin, 'yes');
    }

    async balance() {
        if (!this.readOnly) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.readOnly.getBalances();
    }


    // ========================================================================
    // Authenticated API, operate on your accounts, buy, sell, etc.
    // ========================================================================

    async coinDepositAddress(coin: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.getCoinDepositAddress(coin);
    }

    async marketBuyOrder(coin: string, amount: number, rate: number) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.placeMarketBuyOrder(coin, amount, rate);
    }

    async marketSellOrder(coin: string, amount: number, rate: number) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.placeMarketSellOrder(coin, amount, rate);
    }

    // TODO more high-level methods
}

// Named export
export const createCoinspotApi = (apiKey?: string, apiSecret?: string) => {
    return new Coinspot(apiKey, apiSecret);
};

// Default export
export default Coinspot;