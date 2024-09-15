import { AffiliatePaymentsResponse, BalancesResponse, CoinWithdrawalResponse, CompletedMarketOrdersResponse, CompletedOrdersResponse, DepositHistoryResponse, OpenLimitOrdersResponse, OpenMarketOrdersResponse, OpenOrdersResponse, ReadOnlyStatusResponse, ReferralPaymentsResponse, SendReceiveHistoryResponse, SingleCoinBalanceResponse, WithdrawalHistoryResponse } from './types';
import { CoinspotApiBase } from './coinspotApiBase';
export declare class AuthenticatedCoinspotReadOnlyApi extends CoinspotApiBase {
    getBalances(): Promise<BalancesResponse>;
    withdrawCoin(cointype: string, amount: number, address: string, options?: {
        emailconfirm?: 'YES' | 'NO';
        network?: string;
        paymentid?: string;
    }): Promise<CoinWithdrawalResponse>;
    getReadOnlyStatus(): Promise<ReadOnlyStatusResponse>;
    getOpenMarketOrders(cointype: string, markettype?: string): Promise<OpenMarketOrdersResponse>;
    getMyOpenMarketOrders(cointype?: string, markettype?: string): Promise<OpenOrdersResponse>;
    getCompletedMarketOrders(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedMarketOrdersResponse>;
    getSingleCoinBalance(cointype: string, available: 'yes' | 'no'): Promise<SingleCoinBalanceResponse>;
    getMyOpenLimitOrders(cointype?: string): Promise<OpenLimitOrdersResponse>;
    getMyOrderHistory(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedOrdersResponse>;
    getMyMarketOrderHistory(options: {
        cointype?: string;
        markettype?: string;
        startdate?: string;
        enddate?: string;
        limit?: number;
    }): Promise<CompletedOrdersResponse>;
    getMySendReceiveHistory(startdate?: string, enddate?: string): Promise<SendReceiveHistoryResponse>;
    getMyDepositHistory(startdate?: string, enddate?: string): Promise<DepositHistoryResponse>;
    getMyWithdrawalHistory(startdate?: string, enddate?: string): Promise<WithdrawalHistoryResponse>;
    getMyAffiliatePayments(): Promise<AffiliatePaymentsResponse>;
    getMyReferralPayments(): Promise<ReferralPaymentsResponse>;
}
//# sourceMappingURL=authenticatedReadOnlyApi.d.ts.map