import { ReadOnlyApiStatusResponse, MyCoinBalanceResponse, OpenOrdersResponse, CompletedOrdersResponse, MyCoinBalancesResponse, MyOpenMarketOrdersResponse, MyOpenLimitOrdersResponse, MyOrderHistoryResponse, MyAffiliatePaymentsResponse, MyDepositHistoryResponse, MyReferralPaymentsResponse, MySendReceiveHistoryResponse, MyWithdrawalHistoryResponse } from './types';
import { CoinspotApiBase } from './coinspotApiBase';

export class CoinspotReadOnlyApi extends CoinspotApiBase {

    /**
     * Check the status of the API
     * @returns {Promise<ReadOnlyApiStatusResponse>} Object containing API status
     */
    async checkReadOnlyApiStatus(): Promise<ReadOnlyApiStatusResponse> {
        return this.request<ReadOnlyApiStatusResponse>('/status', {}, true);
    }

    /**
     * Get open market orders
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} [markettype] - Market coin short name (e.g., 'AUD', 'USDT')
     * @returns {Promise<OpenOrdersResponse>} Object containing open market orders for the specified coin and market
     */
    async getOpenMarketOrders(cointype: string, markettype?: string): Promise<OpenOrdersResponse> {
        return this.request<OpenOrdersResponse>('/orders/market/open', { cointype, markettype }, true);
    }

    /**
     * Get completed market orders
     * @param {string} cointype - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
     * @param {string} [markettype] - Market coin short name (e.g., 'AUD', 'USDT')
     * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format or UNIX EPOCH time
     * @param {string} [enddate] - End date in 'YYYY-MM-DD' format or UNIX EPOCH time
     * @param {number} [limit=200] - Number of records to return (max 500)
     * @returns {Promise<CompletedOrdersResponse>} Object containing completed market orders for the specified parameters
     */
    async getCompletedMarketOrders(cointype: string, markettype?: string, startdate?: string, enddate?: string, limit?: number): Promise<CompletedOrdersResponse> {
        return this.request<CompletedOrdersResponse>('/orders/market/completed', { cointype, markettype, startdate, enddate, limit }, true);
    }

    /**
    * Get user's coin balances
    * @returns {Promise<MyCoinBalancesResponse>} Object containing user's coin balances
    */
    async getMyCoinBalances(): Promise<MyCoinBalancesResponse> {
        return this.request<MyCoinBalancesResponse>('/my/balances', {}, true);
    }

    /**
    * Get user's coin balance (available)
    * @param {string} cointype - Coin short name (e.g., 'AUD', 'BTC', 'LTC', 'DOGE')
    * @param {string} available - Whether to return available balance ('yes' or 'no')
    * @returns {Promise<MyCoinBalanceResponse>} Object containing user's coin balance
    */
    async getMyCoinBalance(cointype: string, available: string): Promise<MyCoinBalanceResponse> {
        return this.request<MyCoinBalanceResponse>(`/my/balance/${cointype}?available=${available}`, {}, true);
    }

    /**
    * Get user's open market orders
    * @param {string} [cointype] - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} [markettype] - Market coin short name (e.g., 'USDT', 'AUD')
    * @returns {Promise<MyOpenMarketOrdersResponse>} Object containing user's open market orders
    */
    async getMyOpenMarketOrders(cointype?: string, markettype?: string): Promise<MyOpenMarketOrdersResponse> {
        return this.request<MyOpenMarketOrdersResponse>('/my/orders/market/open', { cointype, markettype }, true);
    }

    /**
    * Get user's open limit orders
    * @param {string} [cointype] - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @returns {Promise<MyOpenLimitOrdersResponse>} Object containing user's open limit orders
    */
    async getMyOpenLimitOrders(cointype?: string): Promise<MyOpenLimitOrdersResponse> {
        return this.request<MyOpenLimitOrdersResponse>('/my/orders/limit/open', { cointype }, true);
    }

    /**
    * Get user's order history
    * @param {string} [cointype] - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} [markettype] - Market coin short name (e.g., 'AUD', 'USDT')
    * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format or UNIX EPOCH time
    * @param {string} [enddate] - End date in 'YYYY-MM-DD' format or UNIX EPOCH time
    * @param {number} [limit=200] - Number of records to return (max 500)
    * @returns {Promise<MyOrderHistoryResponse>} Object containing user's order history
    */
    async getMyOrderHistory(cointype?: string, markettype?: string, startdate?: string, enddate?: string, limit?: number): Promise<MyOrderHistoryResponse> {
        return this.request<MyOrderHistoryResponse>('/my/orders/completed', { cointype, markettype, startdate, enddate, limit }, true);
    }

    /**
    * Get user's market order history
    * @param {string} [cointype] - Coin short name (e.g., 'BTC', 'LTC', 'DOGE')
    * @param {string} [markettype] - Market coin short name (e.g., 'AUD', 'USDT')
    * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format or UNIX EPOCH time
    * @param {string} [enddate] - End date in 'YYYY-MM-DD' format or UNIX EPOCH time
    * @param {number} [limit=200] - Number of records to return (max 500)
    * @returns {Promise<MyOrderHistoryResponse>} Object containing user's market order history
    */
    async getMyMarketOrderHistory(cointype?: string, markettype?: string, startdate?: string, enddate?: string, limit?: number): Promise<MyOrderHistoryResponse> {
        return this.request<MyOrderHistoryResponse>('/my/orders/market/completed', { cointype, markettype, startdate, enddate, limit }, true);
    }

    /**
    * Get user's send and receive history
    * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format
    * @param {string} [enddate] - End date in 'YYYY-MM-DD' format
    * @returns {Promise<MySendReceiveHistoryResponse>} Object containing user's send and receive history
    */
    async getMySendReceiveHistory(startdate?: string, enddate?: string): Promise<MySendReceiveHistoryResponse> {
        return this.request<MySendReceiveHistoryResponse>('/my/sendreceive', { startdate, enddate }, true);
    }

    /**
    * Get user's deposit history
    * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format
    * @param {string} [enddate] - End date in 'YYYY-MM-DD' format
    * @returns {Promise<MyDepositHistoryResponse>} Object containing user's deposit history
    */
    async getMyDepositHistory(startdate?: string, enddate?: string): Promise<MyDepositHistoryResponse> {
        return this.request<MyDepositHistoryResponse>('/my/deposits', { startdate, enddate }, true);
    }

    /**
    * Get user's withdrawal history
    * @param {string} [startdate] - Start date in 'YYYY-MM-DD' format
    * @param {string} [enddate] - End date in 'YYYY-MM-DD' format
    * @returns {Promise<MyWithdrawalHistoryResponse>} Object containing user's withdrawal history
    */
    async getMyWithdrawalHistory(startdate?: string, enddate?: string): Promise<MyWithdrawalHistoryResponse> {
        return this.request<MyWithdrawalHistoryResponse>('/my/withdrawals', { startdate, enddate }, true);
    }

    /**
    * Get user's affiliate payments
    * @returns {Promise<MyAffiliatePaymentsResponse>} Object containing user's affiliate payments
    */
    async getMyAffiliatePayments(): Promise<MyAffiliatePaymentsResponse> {
        return this.request<MyAffiliatePaymentsResponse>('/my/affiliatepayments', {}, true);
    }

    /**
    * Get user's referral payments
    * @returns {Promise<MyReferralPaymentsResponse>} Object containing user's referral payments
    */
    async getMyReferralPayments(): Promise<MyReferralPaymentsResponse> {
        return this.request<MyReferralPaymentsResponse>('/my/referralpayments', {}, true);
    }
}