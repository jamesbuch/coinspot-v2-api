import axios from 'axios';
import { LatestPricesResponse, LatestCoinPricesResponse, LatestBuySellPriceResponse, OpenOrdersResponse, CompletedOrdersResponse } from './types';

export class CoinspotPublicApi {

    private BASE_URL: string = 'https://www.coinspot.com.au/pubapi/v2';
    /**
     * Get latest prices for all coins
     * @returns {Promise<LatestPricesResponse>} Object containing latest prices for all coins
     */
    async getLatestPrices(): Promise<LatestPricesResponse> {
        const response = await axios.get<LatestPricesResponse>(`${this.BASE_URL}/latest`);
        return response.data;
    }

    /**
     * Get latest price for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<LatestCoinPricesResponse>} Object containing latest price for the specified coin
     */
    async getLatestCoinPrice(cointype: string): Promise<LatestCoinPricesResponse> {
        const response = await axios.get<LatestCoinPricesResponse>(`${this.BASE_URL}/latest/${cointype}`);
        return response.data;
    }

    /**
     * Get latest price for a specific coin in a specific market
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} markettype - Market coin short name (e.g., 'USDT')
     * @returns {Promise<LatestCoinPricesResponse>} Object containing latest price for the specified coin in the specified market
     */
    async getLatestCoinMarketPrice(cointype: string, markettype: string): Promise<LatestCoinPricesResponse> {
        const response = await axios.get<LatestCoinPricesResponse>(`${this.BASE_URL}/latest/${cointype}/${markettype}`);
        return response.data;
    }

    /**
     * Get latest buy price for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<LatestBuySellPriceResponse>} Object containing latest buy price for the specified coin
     */
    async getLatestBuyPrice(cointype: string): Promise<LatestBuySellPriceResponse> {
        const response = await axios.get<LatestBuySellPriceResponse>(`${this.BASE_URL}/buyprice/${cointype}`);
        return response.data;
    }

    /**
     * Get latest buy price for a specific coin in a specific market
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} markettype - Market coin short name (e.g., 'USDT')
     * @returns {Promise<LatestBuySellPriceResponse>} Object containing latest buy price for the specified coin in the specified market
     */
    async getLatestBuyMarketPrice(cointype: string, markettype: string): Promise<LatestBuySellPriceResponse> {
        const response = await axios.get<LatestBuySellPriceResponse>(`${this.BASE_URL}/buyprice/${cointype}/${markettype}`);
        return response.data;
    }

    /**
     * Get latest sell price for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<LatestBuySellPriceResponse>} Object containing latest sell price for the specified coin
     */
    async getLatestSellPrice(cointype: string): Promise<LatestBuySellPriceResponse> {
        const response = await axios.get<LatestBuySellPriceResponse>(`${this.BASE_URL}/sellprice/${cointype}`);
        return response.data;
    }

    /**
     * Get latest sell price for a specific coin in a specific market
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} markettype - Market coin short name (e.g., 'USDT')
     * @returns {Promise<LatestBuySellPriceResponse>} Object containing latest sell price for the specified coin in the specified market
     */
    async getLatestSellMarketPrice(cointype: string, markettype: string): Promise<LatestBuySellPriceResponse> {
        const response = await axios.get<LatestBuySellPriceResponse>(`${this.BASE_URL}/sellprice/${cointype}/${markettype}`);
        return response.data;
    }

    /**
     * Get open orders for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<OpenOrdersResponse>} Object containing open buy and sell orders for the specified coin
     */
    async getOpenOrders(cointype: string): Promise<OpenOrdersResponse> {
        const response = await axios.get<OpenOrdersResponse>(`${this.BASE_URL}/orders/open/${cointype}`);
        return response.data;
    }

    /**
     * Get open orders for a specific coin in a specific market
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} markettype - Market coin short name (e.g., 'USDT')
     * @returns {Promise<OpenOrdersResponse>} Object containing open buy and sell orders for the specified coin in the specified market
     */
    async getOpenMarketOrders(cointype: string, markettype: string): Promise<OpenOrdersResponse> {
        const response = await axios.get<OpenOrdersResponse>(`${this.BASE_URL}/orders/open/${cointype}/${markettype}`);
        return response.data;
    }

    /**
     * Get completed orders for a specific coin
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @returns {Promise<CompletedOrdersResponse>} Object containing completed buy and sell orders for the specified coin
     */
    async getCompletedOrders(cointype: string): Promise<CompletedOrdersResponse> {
        const response = await axios.get<CompletedOrdersResponse>(`${this.BASE_URL}/orders/completed/${cointype}`);
        return response.data;
    }

    /**
     * Get completed orders for a specific coin in a specific market
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} markettype - Market coin short name (e.g., 'USDT')
     * @returns {Promise<CompletedOrdersResponse>} Object containing completed buy and sell orders for the specified coin in the specified market
     */
    async getCompletedMarketOrders(cointype: string, markettype: string): Promise<CompletedOrdersResponse> {
        const response = await axios.get<CompletedOrdersResponse>(`${this.BASE_URL}/orders/completed/${cointype}/${markettype}`);
        return response.data;
    }

}
