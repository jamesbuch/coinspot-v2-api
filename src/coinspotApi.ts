import { CoinspotApiBase } from './coinspotApiBase';
import {
    FullAccessApiStatusResponse,
    CoinDepositAddressResponse,
    CancelOrderResponse,
    CoinWithdrawalDetailsResponse,
    BuySellQuoteResponse,
    SwapQuoteResponse,
    PlaceMarketBuySellOrderResponse,
    EditOpenMarketBuySellOrderResponse,
    PlaceBuySellNowOrderResponse,
    PlaceSwapNowOrderResponse,
    WithdrawCoinResponse
} from './types';

export class CoinspotApi extends CoinspotApiBase {

    /**
     * Check the status of the API
     * @returns {Promise<FullAccessApiStatusResponse>} Object containing API status
     */
    async checkFullAccessApiStatus(): Promise<FullAccessApiStatusResponse> {
        return this.request<FullAccessApiStatusResponse>('/status');
    }

    /**
     * Get deposit address for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<CoinDepositAddressResponse>} Object containing deposit address information for the specified coin
     */
    async getCoinDepositAddress(cointype: string): Promise<CoinDepositAddressResponse> {
        return this.request<CoinDepositAddressResponse>('/my/coin/deposit', { cointype });
    }

    /**
    * Get quote for buying a specific coin
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount to buy
    * @param {string} amounttype - 'coin' or 'aud'
    * @returns {Promise<BuySellQuoteResponse>} Object containing buy quote for the specified coin
    */
    async getBuyNowQuote(cointype: string, amount: number, amounttype: string): Promise<BuySellQuoteResponse> {
        return this.request<BuySellQuoteResponse>('/quote/buy/now', { cointype, amount, amounttype });
    }

    /**
    * Get quote for selling a specific coin
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to sell
    * @param {string} amounttype - 'coin' or 'aud'
    * @returns {Promise<BuySellQuoteResponse>} Object containing sell quote for the specified coin
    */
    async getSellNowQuote(cointype: string, amount: number, amounttype: string): Promise<BuySellQuoteResponse> {
        return this.request<BuySellQuoteResponse>('/quote/sell/now', { cointype, amount, amounttype });
    }

    /**
    * Get quote for swapping coins
    * @param {string} cointypesell - Coin short name to sell (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} cointypebuy - Coin short name to buy (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to swap
    * @returns {Promise<SwapQuoteResponse>} Object containing swap quote for the specified coins
    */
    async getSwapNowQuote(cointypesell: string, cointypebuy: string, amount: number): Promise<SwapQuoteResponse> {
        return this.request<SwapQuoteResponse>('/quote/swap/now', { cointypesell, cointypebuy, amount });
    }

    /**
    * Place a market buy order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to buy
    * @param {number} rate - Rate in market currency
    * @param {string} [markettype='AUD'] - Market coin short name (e.g., 'USDT')
    * @returns {Promise<PlaceMarketBuySellOrderResponse>} Object containing details of the placed buy order
    */
    async placeMarketBuyOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceMarketBuySellOrderResponse> {
        return this.request<PlaceMarketBuySellOrderResponse>('/my/buy', { cointype, amount, rate, markettype });
    }

    /**
    * Edit an open market buy order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} id - Order ID of the target buy order
    * @param {number} rate - Current rate of the open order
    * @param {number} newrate - Proposed new rate for the order
    * @returns {Promise<EditOpenMarketBuySellOrderResponse>} Object containing details of the edited buy order
    */
    async editOpenMarketBuyOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOpenMarketBuySellOrderResponse> {
        return this.request<EditOpenMarketBuySellOrderResponse>('/my/buy/edit', { cointype, id, rate, newrate });
    }

    /**
    * Place a buy now order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} amounttype - 'coin' or 'aud'
    * @param {number} amount - Amount to buy
    * @param {number} [rate] - Rate in AUD (optional)
    * @param {number} [threshold] - Percentage threshold for rate variation (0 to 1000) (optional)
    * @param {string} [direction='UP'] - Direction for threshold: 'UP', 'DOWN', or 'BOTH' (optional)
    * @returns {Promise<PlaceBuySellNowOrderResponse>} Object containing details of the placed buy now order
    */
    async placeBuyNowOrder(cointype: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string): Promise<PlaceBuySellNowOrderResponse> {
        return this.request<PlaceBuySellNowOrderResponse>('/my/buy/now', { cointype, amounttype, amount, rate, threshold, direction });
    }

    /**
    * Place a market sell order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to sell
    * @param {number} rate - Rate in AUD
    * @param {string} [markettype='AUD'] - Market coin short name (e.g., 'USDT')
    * @returns {Promise<PlaceMarketBuySellOrderResponse>} Object containing details of the placed sell order
    */
    async placeMarketSellOrder(cointype: string, amount: number, rate: number, markettype?: string): Promise<PlaceMarketBuySellOrderResponse> {
        return this.request<PlaceMarketBuySellOrderResponse>('/my/sell', { cointype, amount, rate, markettype });
    }

    /**
    * Edit an open market sell order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} id - Order ID of the target sell order
    * @param {number} rate - Current rate of the open order
    * @param {number} newrate - Proposed new rate for the order
    * @returns {Promise<EditOpenMarketBuySellOrderResponse>} Object containing details of the edited sell order
    */
    async editOpenMarketSellOrder(cointype: string, id: string, rate: number, newrate: number): Promise<EditOpenMarketBuySellOrderResponse> {
        return this.request<EditOpenMarketBuySellOrderResponse>('/my/sell/edit', { cointype, id, rate, newrate });
    }

    /**
    * Place a sell now order
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} amounttype - 'coin' or 'aud'
    * @param {number} amount - Amount of coins to sell
    * @param {number} [rate] - Rate in AUD (optional)
    * @param {number} [threshold] - Percentage threshold for rate variation (0 to 1000) (optional)
    * @param {string} [direction='DOWN'] - Direction for threshold: 'UP', 'DOWN', or 'BOTH' (optional)
    * @returns {Promise<PlaceBuySellNowOrderResponse>} Object containing details of the placed sell now order
    */
    async placeSellNowOrder(cointype: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string): Promise<PlaceBuySellNowOrderResponse> {
        return this.request<PlaceBuySellNowOrderResponse>('/my/sell/now', { cointype, amounttype, amount, rate, threshold, direction });
    }

    /**
    * Place a swap now order
    * @param {string} cointypesell - Coin short name to sell (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} cointypebuy - Coin short name to buy (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to swap
    * @param {number} [rate] - Rate received from Swap Now Quote (optional)
    * @param {number} [threshold] - Percentage threshold for rate variation (0 to 1000) (optional)
    * @param {string} [direction='BOTH'] - Direction for threshold: 'UP', 'DOWN', or 'BOTH' (optional)
    * @returns {Promise<PlaceSwapNowOrderResponse>} Object containing details of the placed swap now order
    */
    async placeSwapNowOrder(cointypesell: string, cointypebuy: string, amount: number, rate?: number, threshold?: number, direction?: string): Promise<PlaceSwapNowOrderResponse> {
        return this.request<PlaceSwapNowOrderResponse>('/my/swap/now', { cointypesell, cointypebuy, amount, rate, threshold, direction });
    }

    /**
    * Cancel a buy order
    * @param {string} id - ID of the buy order to cancel
    * @returns {Promise<CancelOrderResponse>} Object containing the cancellation status
    */
    async cancelBuyOrder(id: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/buy/cancel', { id });
    }

    /**
    * Cancel all buy orders
    * @param {string} [coin] - Coin short name to cancel orders for (optional)
    * @returns {Promise<CancelOrderResponse>} Object containing the cancellation status
    */
    async cancelAllBuyOrders(coin?: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/buy/cancel/all', { coin });
    }

    /**
    * Cancel a sell order
    * @param {string} id - ID of the sell order to cancel
    * @returns {Promise<CancelOrderResponse>} Object containing the cancellation status
    */
    async cancelSellOrder(id: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/sell/cancel', { id });
    }

    /**
    * Cancel all sell orders
    * @param {string} [coin] - Coin short name to cancel orders for (optional)
    * @returns {Promise<CancelOrderResponse>} Object containing the cancellation status
    */
    async cancelAllSellOrders(coin?: string): Promise<CancelOrderResponse> {
        return this.request<CancelOrderResponse>('/my/sell/cancel/all', { coin });
    }

    /**
    * Get coin withdrawal details
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @returns {Promise<CoinWithdrawalDetailsResponse>} Object containing withdrawal details for the specified coin
    */
    async getCoinWithdrawalDetails(cointype: string): Promise<CoinWithdrawalDetailsResponse> {
        return this.request<CoinWithdrawalDetailsResponse>('/my/coin/withdraw/senddetails', { cointype });
    }

    /**
    * Withdraw coin
    * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {number} amount - Amount of coins to withdraw
    * @param {string} address - Destination address for the withdrawal
    * @param {string} [emailconfirm='NO'] - Whether to send email confirmation ('YES' or 'NO')
    * @param {string} [network] - Network to use for sending (e.g., 'BNB', 'ETH')
    * @param {string} [paymentid] - Payment ID/memo for the withdrawal (where applicable)
    * @returns {Promise<WithdrawCoinResponse>} Object containing the withdrawal status
    */
    async withdrawCoin(cointype: string, amount: number, address: string, emailconfirm?: string, network?: string, paymentid?: string): Promise<WithdrawCoinResponse> {
        return this.request<WithdrawCoinResponse>('/my/coin/withdraw/send', { cointype, amount, address, emailconfirm, network, paymentid });
    }
}
