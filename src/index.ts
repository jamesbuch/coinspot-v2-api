// src/index.ts
import { CoinspotPublicApi } from './coinspotPublicApi';
import { CoinspotReadOnlyApi } from './coinspotReadOnlyApi';
import { CoinspotApi } from './coinspotApi';

export * from './types';

export class Coinspot {

    public readonly public: CoinspotPublicApi;
    public readonly readOnly: CoinspotReadOnlyApi | null;
    public readonly authenticated: CoinspotApi | null;

    private apiKeyRequiredMessage = 'API key and secret are required for authenticated operations';

    constructor(apiKey?: string, apiSecret?: string) {
        this.public = new CoinspotPublicApi();

        if (apiKey && apiSecret) {
            this.readOnly = new CoinspotReadOnlyApi(apiKey, apiSecret);
            this.authenticated = new CoinspotApi(apiKey, apiSecret);
        } else {
            this.readOnly = null;
            this.authenticated = null;
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
        return this.readOnly.getMyCoinBalance(coin, 'yes');
    }

    async balance() {
        if (!this.readOnly) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.readOnly.getMyCoinBalances();
    }

    async readOnlyApiStatus() {
        if (!this.readOnly) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.readOnly.checkReadOnlyApiStatus();
    }

    // ========================================================================
    // Authenticated API, operate on your accounts, buy, sell, etc.
    // ========================================================================

    async fullAccessApiStatus() {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.checkFullAccessApiStatus();
    }

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

    async cancelBuyOrder(id: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.cancelBuyOrder(id);
    }

    async cancelSellOrder(id: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.cancelSellOrder(id);
    }

    async buyNowOrder(coin: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.placeBuyNowOrder(coin, amounttype, amount, rate, threshold, direction);
    }

    async sellNowOrder(coin: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.placeSellNowOrder(coin, amounttype, amount, rate, threshold, direction)
    }

    async swapNow(cointypesell: string, cointypebuy: string, amount: number, rate?: number, threshold?: number, direction?: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.placeSwapNowOrder(cointypesell, cointypebuy, amount, rate, threshold, direction);
    }

    async buyNowQuote(coin: string, amount: number, amounttype: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.getBuyNowQuote(coin, amount, amounttype);
    }

    async sellNowQuote(coin: string, amount: number, amounttype: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.getSellNowQuote(coin, amount, amounttype);
    }

    async swapNowQuote(sellcoin: string, buycoin: string, amount: number) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.getSwapNowQuote(sellcoin, buycoin, amount);
    }

    async withdrawalHistory(coin: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.getCoinWithdrawalDetails(coin);
    }

    async withdrawCoins(coin: string, amount: number, address: string, emailconfirm?: string, network?: string, paymentid?: string) {
        if (!this.authenticated) {
            throw new Error(this.apiKeyRequiredMessage);
        }
        return this.authenticated.withdrawCoin(coin, amount, address, emailconfirm, network, paymentid);
    }

    // TODO more high-level methods
}

// Named export
export const createCoinspotApi = (apiKey?: string, apiSecret?: string) => {
    return new Coinspot(apiKey, apiSecret);
};

// Default export
export default Coinspot;