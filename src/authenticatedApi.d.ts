import { CoinspotApiBase } from './coinspotApiBase';
import { StatusResponse, CoinDepositAddressResponse, QuoteResponse, PlaceOrderResponse, EditOrderResponse, BuyNowOrderResponse, SellNowOrderResponse, SwapNowOrderResponse, CancelOrderResponse, CoinWithdrawalDetailsResponse } from './types';
export declare class AuthenticatedCoinspotApi extends CoinspotApiBase {
    getStatus(): Promise<StatusResponse>;
    getCoinWithdrawalDetails(cointype: string): Promise<CoinWithdrawalDetailsResponse>;
    getCoinDepositAddress(cointype: string): Promise<CoinDepositAddressResponse>;
    getBuyNowQuote(cointype: string, amount: number, amounttype: 'coin' | 'aud'): Promise<QuoteResponse>;
    getSellNowQuote(cointype: string, amount: number, amounttype: 'coin' | 'aud'): Promise<QuoteResponse>;
    getSwapNowQuote(cointypesell: string, cointypebuy: string, amount: number): Promise<QuoteResponse>;
    placeMarketBuyOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceOrderResponse>;
    editOpenMarketBuyOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOrderResponse>;
    placeBuyNowOrder(cointype: string, amounttype: 'coin' | 'aud', amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<BuyNowOrderResponse>;
    placeMarketSellOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceOrderResponse>;
    editOpenMarketSellOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOrderResponse>;
    placeSellNowOrder(cointype: string, amounttype: 'coin' | 'aud', amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<SellNowOrderResponse>;
    placeSwapNowOrder(cointypesell: string, cointypebuy: string, amount: number, options?: {
        rate?: number;
        threshold?: number;
        direction?: 'UP' | 'DOWN' | 'BOTH';
    }): Promise<SwapNowOrderResponse>;
    cancelBuyOrder(id: string): Promise<CancelOrderResponse>;
    cancelAllBuyOrders(coin?: string): Promise<CancelOrderResponse>;
    cancelSellOrder(id: string): Promise<CancelOrderResponse>;
    cancelAllSellOrders(coin?: string): Promise<CancelOrderResponse>;
}
//# sourceMappingURL=authenticatedApi.d.ts.map