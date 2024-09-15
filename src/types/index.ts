// Status Responses
export type ReadOnlyApiStatusResponse = {
    status: string;
}

// Full acccess status response identical to ReadOnly API status response
export type FullAccessApiStatusResponse = ReadOnlyApiStatusResponse;

// Base API Response
export type BaseApiResponse = {
    status: string;
    message: string;
};

// Latest Prices
export type LatestPricesResponse = BaseApiResponse & {
    prices: {
        [coinType: string]: {
            bid: number;
            ask: number;
            last: number;
        };
    };
};

// Latest Coin Prices
export type LatestCoinPricesResponse = BaseApiResponse & {
    prices: {
        bid: number;
        ask: number;
        last: number;
    };
};

// Latest Buy/Sell Price
export type LatestBuySellPriceResponse = BaseApiResponse & {
    rate: string;
    market: string;
};

// Open Orders
export type OpenOrder = {
    amount: number;
    rate: number;
    total: number;
    coin: string;
    market: string;
};

export type OpenOrdersResponse = BaseApiResponse & {
    buyorders: OpenOrder[];
    sellorders: OpenOrder[];
};

// Completed Orders
export type CompletedOrder = OpenOrder & {
    solddate: string;
};

export type CompletedOrdersResponse = BaseApiResponse & {
    buyorders: CompletedOrder[];
    sellorders: CompletedOrder[];
};

// Coin Deposit Address
export type CoinDepositAddressResponse = BaseApiResponse & {
    networks: {
        name: string;
        network: string;
        address: string;
        memo: string;
    }[];
};

// Buy/Sell Quote
export type BuySellQuoteResponse = BaseApiResponse & {
    rate: number;
};

// Swap Quote
export type SwapQuoteResponse = BaseApiResponse & {
    rate: number;
};

// Place Market Buy/Sell Order
export type PlaceMarketBuySellOrderResponse = BaseApiResponse & {
    coin: string;
    market: string;
    amount: number;
    rate: number;
    id: string;
};

// Edit Open Market Buy/Sell Order
export type EditOpenMarketBuySellOrderResponse = BaseApiResponse & {
    updated: boolean;
    id: string;
    coin: string;
    rate: number;
    newrate: number;
    amount: number;
    total: number;
};

// Place Buy/Sell Now Order
export type PlaceBuySellNowOrderResponse = BaseApiResponse & {
    coin: string;
    amount: number;
    market: string;
    total: number;
};

// Place Swap Now Order
export type PlaceSwapNowOrderResponse = BaseApiResponse & {
    coin: string;
    amount: number;
    rate: number;
    market: string;
    total: number;
};

// Cancel Order
export type CancelOrderResponse = BaseApiResponse;

// Coin Withdrawal Details
export type CoinWithdrawalDetailsResponse = BaseApiResponse & {
    networks: {
        network: string;
        paymentid: string;
        fee: number;
        minsend: number;
        default: boolean;
    }[];
};

// Withdraw Coin
export type WithdrawCoinResponse = BaseApiResponse;

// My Coin Balances
export type MyCoinBalancesResponse = BaseApiResponse & {
    balances: {
        [coinType: string]: {
            balance: number;
            audbalance: number;
            rate: number;
        };
    }[];
};

// My Coin Balance
export type MyCoinBalanceResponse = BaseApiResponse & {
    balance: {
        [coinType: string]: {
            balance: number;
            available?: number;
            audbalance: number;
            rate: number;
        };
    };
};

// My Open Market Orders
export type MyOpenMarketOrder = {
    id: string;
    coin: string;
    market: string;
    amount: number;
    created: string;
    rate: number;
    total: number;
};

export type MyOpenMarketOrdersResponse = BaseApiResponse & {
    buyorders: MyOpenMarketOrder[];
    sellorders: MyOpenMarketOrder[];
};

// My Open Limit Orders
export type MyOpenLimitOrder = {
    id: string;
    coin: string;
    market: string;
    rate: number;
    amount: number;
    created: string;
    type: string;
};

export type MyOpenLimitOrdersResponse = BaseApiResponse & {
    buyorders: MyOpenLimitOrder[];
    sellorders: MyOpenLimitOrder[];
};

// My Order History
export type MyOrderHistoryItem = {
    id: string;
    coin: string;
    type: string;
    market: string;
    rate: number;
    amount: number;
    total: number;
    solddate: string;
    audfeeExGst: number;
    audGst: number;
    audtotal: number;
    otc?: boolean;
};

export type MyOrderHistoryResponse = BaseApiResponse & {
    buyorders: MyOrderHistoryItem[];
    sellorders: MyOrderHistoryItem[];
};

// My Send/Receive History
export type MySendTransaction = {
    timestamp: string;
    amount: number;
    coin: string;
    address: string;
    aud: number;
    sendfee: number;
};

export type MyReceiveTransaction = {
    timestamp: string;
    amount: number;
    coin: string;
    address: string;
    aud: number;
    from: string;
};

export type MySendReceiveHistoryResponse = BaseApiResponse & {
    sendtransactions: MySendTransaction[];
    receivetransactions: MyReceiveTransaction[];
};

// My Deposit History
export type MyDepositHistoryItem = {
    amount: number;
    created: string;
    status: string;
    type: string;
    reference: string;
};

export type MyDepositHistoryResponse = BaseApiResponse & {
    deposits: MyDepositHistoryItem[];
};

// My Withdrawal History
export type MyWithdrawalHistoryItem = {
    amount: number;
    created: string;
    status: string;
};

export type MyWithdrawalHistoryResponse = BaseApiResponse & {
    withdrawals: MyWithdrawalHistoryItem[];
};

// My Affiliate Payments
export type MyAffiliatePayment = {
    amount: number;
    month: string;
};

export type MyAffiliatePaymentsResponse = BaseApiResponse & {
    payments: MyAffiliatePayment[];
};

// My Referral Payments
export type MyReferralPayment = {
    amount: number;
    coin: string;
    audamount: number;
    timestamp: string;
};

export type MyReferralPaymentsResponse = BaseApiResponse & {
    payments: MyReferralPayment[];
};

/*

Note on identical and overlapping types:

LatestBuySellPriceResponse is used for both buy and sell price responses.
BuySellQuoteResponse is used for both buy and sell quote responses.
PlaceMarketBuySellOrderResponse is used for both market buy and sell order responses.
EditOpenMarketBuySellOrderResponse is used for both edit market buy and sell order responses.
PlaceBuySellNowOrderResponse is used for both buy now and sell now order responses.
CancelOrderResponse is used for both buy and sell order cancellation responses.

*/
