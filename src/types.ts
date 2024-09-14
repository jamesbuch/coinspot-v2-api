/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ApiResponse {
    status: string;
    message?: string;  // Make message optional
}

export interface CoinPrice {
    bid: string;
    ask: string;
    last: string;
}

export interface LatestPrices {
    [coin: string]: CoinPrice;
}

export interface LatestPricesResponse extends ApiResponse {
    prices: LatestPrices;
}

export interface SingleCoinPriceResponse extends ApiResponse {
    prices: CoinPrice;
}

export interface BuySellPriceResponse extends ApiResponse {
    rate: string;
    market: string;
}

export interface Order {
    amount: string;
    rate: string;
    total: string;
    coin: string;
    market: string;
}

export interface OpenOrdersResponse extends ApiResponse {
    buyorders: Order[];
    sellorders: Order[];
}

export interface CompletedOrder extends Order {
    solddate: string;
}

export interface CompletedOrdersResponse extends ApiResponse {
    buyorders: CompletedOrder[];
    sellorders: CompletedOrder[];
}

export interface CoinBalance {
    balance: number;
    audbalance: number;
    rate: number;
}

export interface BalanceEntry {
    [coin: string]: CoinBalance;
}

export interface BalancesResponse extends ApiResponse {
    balances: BalanceEntry[];
}

export interface CoinWithdrawalResponse extends ApiResponse {
}

export interface ReadOnlyStatusResponse {
    status: string;
}

// Unified Order type
export interface Order {
    id?: string;  // Optional because some responses don't include an id
    amount: string;
    rate: string;
    total: string;
    coin: string;
    market: string;
    created?: string;  // Optional because not all order types include this
}

export interface OpenMarketOrdersResponse extends ApiResponse {
    buyorders: Order[];
    sellorders: Order[];
}

export interface CompletedMarketOrder extends Order {
    solddate: string;
    audfeeExGst: string;
    audGst: string;
    audtotal: string;
}

export interface CompletedMarketOrdersResponse extends ApiResponse {
    buyorders: CompletedMarketOrder[];
    sellorders: CompletedMarketOrder[];
}

export interface OpenOrdersResponse extends ApiResponse {
    buyorders: Order[];
    sellorders: Order[];
}

export interface OpenLimitOrder extends Order {
    type: string;
}

export interface OpenLimitOrdersResponse extends ApiResponse {
    buyorders: OpenLimitOrder[];
    sellorders: OpenLimitOrder[];
}

export interface CompletedOrder extends Order {
    type: string;
    otc?: boolean;
    solddate: string;
    audfeeExGst: string;
    audGst: string;
    audtotal: string;
}

export interface CompletedOrdersResponse extends ApiResponse {
    buyorders: CompletedOrder[];
    sellorders: CompletedOrder[];
}

export interface BalancesResponse extends ApiResponse {
    balances: BalanceEntry[];
}

export interface SingleCoinBalanceResponse extends ApiResponse {
    balance: {
        [coin: string]: CoinBalance & { available?: string };
    };
}

export interface SendTransaction {
    timestamp: string;
    amount: string;
    coin: string;
    address: string;
    aud: string;
    sendfee: string;
}

export interface ReceiveTransaction {
    timestamp: string;
    amount: string;
    coin: string;
    address: string;
    aud: string;
    from: string;
}

export interface SendReceiveHistoryResponse extends ApiResponse {
    sendtransactions: SendTransaction[];
    receivetransactions: ReceiveTransaction[];
}

export interface Deposit {
    amount: string;
    created: string;
    status: string;
    type: string;
    reference: string;
}

export interface DepositHistoryResponse extends ApiResponse {
    deposits: Deposit[];
}

export interface Withdrawal {
    amount: string;
    created: string;
    status: string;
}

export interface WithdrawalHistoryResponse extends ApiResponse {
    withdrawals: Withdrawal[];
}

export interface AffiliatePayment {
    amount: string;
    month: string;
}

export interface AffiliatePaymentsResponse extends ApiResponse {
    payments: AffiliatePayment[];
}

export interface ReferralPayment {
    amount: string;
    coin: string;
    audamount: string;
    timestamp: string;
}

export interface ReferralPaymentsResponse extends ApiResponse {
    payments: ReferralPayment[];
}

export interface StatusResponse extends ApiResponse { }

export interface CoinDepositAddressNetwork {
    name: string;
    network: string;
    address: string;
    memo: string;
}

export interface CoinDepositAddressResponse extends ApiResponse {
    networks: CoinDepositAddressNetwork[];
}

export interface QuoteResponse extends ApiResponse {
    rate: string;
}

export interface PlaceOrderResponse extends ApiResponse {
    coin: string;
    market: string;
    amount: string;
    rate: string;
    id: string;
}

export interface EditOrderResponse extends ApiResponse {
    id: string;
    coin: string;
    rate: string;
    newrate: string;
    amount: string;
    total: string;
    updated: boolean;
}

export interface BuyNowOrderResponse extends ApiResponse {
    coin: string;
    amount: string;
    market: string;
    total: string;
}

export interface SellNowOrderResponse extends BuyNowOrderResponse {
    rate: string;
}

export interface SwapNowOrderResponse extends SellNowOrderResponse { }

export interface CancelOrderResponse extends ApiResponse { }

export interface CoinWithdrawalNetwork {
    network: string;
    paymentid: 'no' | 'optional' | 'required';
    fee: number;
    minsend: number;
    default: boolean;
}

export interface CoinWithdrawalDetailsResponse extends ApiResponse {
    networks: CoinWithdrawalNetwork[];
}
