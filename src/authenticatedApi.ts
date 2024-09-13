import { CoinspotApiBase } from './coinspotApiBase';
import {
    StatusResponse,
    CoinDepositAddressResponse,
    QuoteResponse,
    PlaceOrderResponse,
    EditOrderResponse,
    BuyNowOrderResponse,
    SellNowOrderResponse,
    SwapNowOrderResponse,
    CancelOrderResponse,
    CoinWithdrawalDetailsResponse
} from './types';

export class AuthenticatedCoinspotApi extends CoinspotApiBase {

    async getStatus(): Promise<StatusResponse> {
        return this.request<StatusResponse>('/status');
    }

    async getCoinWithdrawalDetails(cointype: string): Promise<CoinWithdrawalDetailsResponse> {
        return this.request<CoinWithdrawalDetailsResponse>('/my/coin/withdraw/senddetails', { cointype });
    }

    async getCoinDepositAddress(cointype: string): Promise<CoinDepositAddressResponse> {
        return this.request<CoinDepositAddressResponse>('/my/coin/deposit', { cointype });
    }

    async getBuyNowQuote(cointype: string, amount: number, amounttype: 'coin' | 'aud'): Promise<QuoteResponse> {
        return this.request<QuoteResponse>('/quote/buy/now', { cointype, amount, amounttype });
    }

    async getSellNowQuote(cointype: string, amount: number, amounttype: 'coin' | 'aud'): Promise<QuoteResponse> {
        return this.request<QuoteResponse>('/quote/sell/now', { cointype, amount, amounttype });
    }

    async getSwapNowQuote(cointypesell: string, cointypebuy: string, amount: number): Promise<QuoteResponse> {
        return this.request<QuoteResponse>('/quote/swap/now', { cointypesell, cointypebuy, amount });
    }

    async placeMarketBuyOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceOrderResponse> {
        return this.request<PlaceOrderResponse>('/my/buy', { cointype, amount, rate, markettype });
    }

    async editOpenMarketBuyOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOrderResponse> {
        return this.request<EditOrderResponse>('/my/buy/edit', { cointype, id, rate, newrate });
    }

    async placeBuyNowOrder(cointype: string, amounttype: 'coin' | 'aud', amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<BuyNowOrderResponse> {
        return this.request<BuyNowOrderResponse>('/my/buy/now', { cointype, amounttype, amount, ...options });
    }

    async placeMarketSellOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceOrderResponse> {
        return this.request<PlaceOrderResponse>('/my/sell', { cointype, amount, rate, markettype });
    }

    async editOpenMarketSellOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOrderResponse> {
        return this.request<EditOrderResponse>('/my/sell/edit', { cointype, id, rate, newrate });
    }

    async placeSellNowOrder(cointype: string, amounttype: 'coin' | 'aud', amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<SellNowOrderResponse> {
        return this.request<SellNowOrderResponse>('/my/sell/now', { cointype, amounttype, amount, ...options });
    }

    async placeSwapNowOrder(cointypesell: string, cointypebuy: string, amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<SwapNowOrderResponse> {
        return this.request<SwapNowOrderResponse>('/my/swap/now', { cointypesell, cointypebuy, amount, ...options });
    }

    async cancelBuyOrder(id: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/buy/cancel', { id });
    }

    async cancelAllBuyOrders(coin?: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/buy/cancel/all', coin ? { coin } : {});
    }

    async cancelSellOrder(id: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/sell/cancel', { id });
    }

    async cancelAllSellOrders(coin?: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/sell/cancel/all', coin ? { coin } : {});
    }
}
