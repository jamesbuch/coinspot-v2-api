import { AffiliatePaymentsResponse, BalancesResponse, CoinBalance, CoinWithdrawalResponse, CompletedMarketOrdersResponse, CompletedOrdersResponse, DepositHistoryResponse, OpenLimitOrdersResponse, OpenMarketOrdersResponse, OpenOrdersResponse, ReadOnlyStatusResponse, ReferralPaymentsResponse, SendReceiveHistoryResponse, SingleCoinBalanceResponse, WithdrawalHistoryResponse } from './types';
import { CoinspotApiBase } from './coinspotApiBase';

export class AuthenticatedCoinspotReadOnlyApi extends CoinspotApiBase {
    async getBalances(): Promise<BalancesResponse> {
        return this.request<BalancesResponse>('/my/balances', {}, true);
    }

    // Helper method to get balances in a more usable format
    async getFormattedBalances(): Promise<{ [coin: string]: CoinBalance }> {
        const response = await this.getBalances();
        return response.balances.reduce((acc, entry) => {
            const [coin, balance] = Object.entries(entry)[0];
            acc[coin] = balance;
            return acc;
        }, {} as { [coin: string]: CoinBalance });
    }

    // Add more methods for other authenticated endpoints
    async withdrawCoin(cointype: string, amount: number, address: string, options?: {
        emailconfirm?: 'YES' | 'NO';
        network?: string;
        paymentid?: string;
    }): Promise<CoinWithdrawalResponse> {
        return this.request<CoinWithdrawalResponse>('/my/coin/withdraw/send', {
            cointype,
            amount,
            address,
            ...options
        });
    }

    async getReadOnlyStatus(): Promise<ReadOnlyStatusResponse> {
        return this.request<ReadOnlyStatusResponse>('/status', {}, true);
    }

    async getOpenMarketOrders(cointype: string, markettype?: string): Promise<OpenMarketOrdersResponse> {
        return this.request<OpenMarketOrdersResponse>('/orders/market/open', { cointype, markettype }, true);
    }

    async getMyOpenMarketOrders(cointype?: string, markettype?: string): Promise<OpenOrdersResponse> {
        return this.request<OpenOrdersResponse>('/my/orders/market/open', { cointype, markettype }, true);
    }

    async getCompletedMarketOrders(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedMarketOrdersResponse> {
        return this.request<CompletedMarketOrdersResponse>('/orders/market/completed', options, true);
    }

    async getSingleCoinBalance(cointype: string, available: 'yes' | 'no'): Promise<SingleCoinBalanceResponse> {
        return this.request<SingleCoinBalanceResponse>(`/my/balance/${cointype}?available=${available}`, {}, true);
    }

    async getMyOpenLimitOrders(cointype?: string): Promise<OpenLimitOrdersResponse> {
        return this.request<OpenLimitOrdersResponse>('/my/orders/limit/open', { cointype }, true);
    }

    async getMyOrderHistory(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedOrdersResponse> {
        return this.request<CompletedOrdersResponse>('/my/orders/completed', options, true);
    }

    async getMyMarketOrderHistory(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedOrdersResponse> {
        return this.request<CompletedOrdersResponse>('/my/orders/market/completed', options, true);
    }

    async getMySendReceiveHistory(startdate?: string, enddate?: string): Promise<SendReceiveHistoryResponse> {
        return this.request<SendReceiveHistoryResponse>('/my/sendreceive', { startdate, enddate }, true);
    }

    async getMyDepositHistory(startdate?: string, enddate?: string): Promise<DepositHistoryResponse> {
        return this.request<DepositHistoryResponse>('/my/deposits', { startdate, enddate }, true);
    }

    async getMyWithdrawalHistory(startdate?: string, enddate?: string): Promise<WithdrawalHistoryResponse> {
        return this.request<WithdrawalHistoryResponse>('/my/withdrawals', { startdate, enddate }, true);
    }

    async getMyAffiliatePayments(): Promise<AffiliatePaymentsResponse> {
        return this.request<AffiliatePaymentsResponse>('/my/affiliatepayments', {}, true);
    }

    async getMyReferralPayments(): Promise<ReferralPaymentsResponse> {
        return this.request<ReferralPaymentsResponse>('/my/referralpayments', {}, true);
    }
}