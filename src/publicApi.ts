import axios from 'axios';
import { LatestPricesResponse, SingleCoinPriceResponse, BuySellPriceResponse, OpenOrdersResponse, CompletedOrdersResponse } from './types';

const BASE_URL = 'https://www.coinspot.com.au/pubapi/v2';

export class CoinspotPublicApi {

    async getLatestPrices(): Promise<LatestPricesResponse> {
        const response = await axios.get<LatestPricesResponse>(`${BASE_URL}/latest`);
        return response.data;
    }

    async getLatestCoinPrice(coin: string): Promise<SingleCoinPriceResponse> {
        const response = await axios.get<SingleCoinPriceResponse>(`${BASE_URL}/latest/${coin}`);
        return response.data;
    }

    async getLatestBuyPrice(coin: string): Promise<BuySellPriceResponse> {
        const response = await axios.get<BuySellPriceResponse>(`${BASE_URL}/buyprice/${coin}`);
        return response.data;
    }

    async getLatestSellPrice(coin: string): Promise<BuySellPriceResponse> {
        const response = await axios.get<BuySellPriceResponse>(`${BASE_URL}/sellprice/${coin}`);
        return response.data;
    }

    async getOpenOrders(coin: string): Promise<OpenOrdersResponse> {
        const response = await axios.get<OpenOrdersResponse>(`${BASE_URL}/orders/open/${coin}`);
        return response.data;
    }

    async getCompletedOrders(coin: string): Promise<CompletedOrdersResponse> {
        const response = await axios.get<CompletedOrdersResponse>(`${BASE_URL}/orders/completed/${coin}`);
        return response.data;
    }
}
