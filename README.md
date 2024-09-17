# Coinspot V2 API Wrapper

A comprehensive TypeScript wrapper for the Coinspot V2 API, providing easy access to public, read-only, and authenticated endpoints.

TypeScript types are provided in the distribution package, and comprehensive JSDoc comments are included too.

Please also see the test suite for reference.

This package bundles the TypeScript up in `dist/` as CommonJS, and is therefore compatible with most
projects.  You can find the generated JS code in `node_modules/coinspot-v2-api/dist`.

You can use it with JavaScript or TypeScript, and you can set your package type to "module".
If you do, as in the examples below, import the named types from coinspot-v2-api.

## Donations

If you find this project helpful, consider supporting its development with a DOGE donation:

Ð DOGE Address: `D8hDbe3YX1umuvKKFukKNEhicDA8of5JCR`

## Features

- Full coverage of Coinspot V2 API endpoints
- TypeScript support with detailed type definitions
- Separate classes for public, read-only, and authenticated APIs
- Easy-to-use high-level API for common operations
- Secure handling of API keys and request signing
- Comprehensive error handling and response typing

## Installation

```bash
npm install coinspot-v2-api
```

## Usage

### Basic Usage

```javascript
import { Coinspot } from 'coinspot-v2-api';
import dotenv from 'dotenv';
dotenv.config();

const coinspot = new Coinspot(process.env['COINSPOT_API_KEY'], process.env['COINSPOT_API_SECRET']);
// Get latest prices
const prices = await coinspot.latestPrices();
console.log('Latest prices:', prices);

// Get Bitcoin price
const bitcoinPrice = await coinspot.latestCoinPrice('BTC');
console.log('Bitcoin price:', bitcoinPrice);

// Get deposit address for Ethereum
const ethAddress = await coinspot.coinDepositAddress('ETH');
console.log('ETH deposit address:', ethAddress.networks[0].address);
```

Output:

<code>
Latest prices: {
  status: 'ok',
  prices: {
    btc: { bid: '86487.75', ask: '86792.95', last: '86689.91' },
    usdt: { bid: '1.4844', ask: '1.487', last: '1.487' },
    ltc: { bid: '92.7', ask: '98.99', last: '94.7' },
    doge: { bid: '0.14863', ask: '0.158363', last: '0.15728225' },
    eth: { bid: '3395.69', ask: '3458.4', last: '3399.66' },
    sol: { bid: '195', ask: '196.44', last: '195.8' },
    powr: { bid: '0.28', ask: '0.29595', last: '0.288' },
    ans: { bid: '12.17', ask: '14.61', last: '13.7' },
    xrp: { bid: '0.869351', ask: '0.875', last: '0.87095' },
    trx: { bid: '0.221616', ask: '0.229777', last: '0.22789' },
    eos: { bid: '0.6961', ask: '0.9227', last: '0.6789' },
    str: { bid: '0.140925', ask: '0.167998', last: '0.16609328' },
    rfox: { bid: 'NaN', ask: 'NaN', last: '0.00539896' },
    gas: { bid: '4.66', ask: '4.995', last: '4.8' },
    ada: { bid: '0.490452', ask: '0.500696', last: '0.498' },
    rhoc: { bid: '0.008005', ask: '0.023498', last: '0.023498' },
    btc_usdt: { bid: '57210', ask: '60000', last: '58100' }
  }
}
Bitcoin price: {
  status: 'ok',
  prices: { bid: '86487.75', ask: '86792.95', last: '86689.91' }
}
ETH deposit address: 0x0ba2d032e17f1855abf16091b16cdb8ce3f442b6
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Latest prices: {
  status: 'ok',
  prices: {
    btc: { bid: '86487.75', ask: '86792.95', last: '86689.91' },
    usdt: { bid: '1.4844', ask: '1.487', last: '1.487' },
    ltc: { bid: '92.7', ask: '98.99', last: '94.7' },
    doge: { bid: '0.14863', ask: '0.158363', last: '0.15728225' },
    eth: { bid: '3395.69', ask: '3458.4', last: '3399.66' },
    sol: { bid: '195', ask: '196.44', last: '195.8' },
    powr: { bid: '0.28', ask: '0.29595', last: '0.288' },
    ans: { bid: '12.17', ask: '14.61', last: '13.7' },
    xrp: { bid: '0.869351', ask: '0.875', last: '0.87095' },
    trx: { bid: '0.221616', ask: '0.229777', last: '0.22789' },
    eos: { bid: '0.6961', ask: '0.9227', last: '0.6789' },
    str: { bid: '0.140925', ask: '0.167998', last: '0.16609328' },
    rfox: { bid: 'NaN', ask: 'NaN', last: '0.00539896' },
    gas: { bid: '4.66', ask: '4.995', last: '4.8' },
    ada: { bid: '0.490452', ask: '0.500696', last: '0.498' },
    rhoc: { bid: '0.008005', ask: '0.023498', last: '0.023498' },
    btc_usdt: { bid: '57210', ask: '60000', last: '58100' }
  }
}
Bitcoin price: {
  status: 'ok',
  prices: { bid: '86487.75', ask: '86790.93', last: '86689.91' }
}
ETH deposit address: 0x0ba2d032e17f1855abf16091b16cdb8ce3f442b6
</code>

To run TypeScript directly, you can run:

```bash
npm install --save-dev ts-node
node --loader ts-node/esm index.ts
```

```typescript
import { CoinDepositAddressResponse, Coinspot, LatestCoinPricesResponse, MyCoinBalanceResponse } from 'coinspot-v2-api';
import { LatestPricesResponse } from 'coinspot-v2-api';
import dotenv from 'dotenv';
dotenv.config();

const coinspot: Coinspot = new Coinspot(process.env['COINSPOT_API_KEY'], process.env['COINSPOT_API_SECRET']);

// Get latest prices
const prices: LatestPricesResponse = await coinspot.latestPrices();
if (prices.status == "ok") {
    for (const key in prices.prices) {
        console.log(`Coin: ${key}\tLast Price: ${prices.prices[key].last}`);
    }
}

// Get Bitcoin price
const bitcoinPrice: LatestCoinPricesResponse = await coinspot.latestCoinPrice('BTC');
if (bitcoinPrice.status == "ok") {
    console.log(`Bitcoin price:\t${bitcoinPrice.prices.last}`);
}

// Get deposit address for Ethereum
const ethAddress: CoinDepositAddressResponse = await coinspot.coinDepositAddress('ETH');
if (ethAddress.status == "ok") {
    console.log(`ETH Deposit Address: ${ethAddress.networks[0].address}\nNetwork: ${ethAddress.networks[0].network}`);
}

// Get deposit address for Bitcoin
const btcAddress: CoinDepositAddressResponse = await coinspot.coinDepositAddress('BTC');
if (btcAddress.status == "ok") {
    console.log(`BTC Deposit Address: ${btcAddress.networks[0].address}\nNetwork: ${btcAddress.networks[0].network}`);
}

// Get deposit address for Bitcoin Cash
const bchAddress: CoinDepositAddressResponse = await coinspot.coinDepositAddress('BCH');
if (bchAddress.status == "ok") {
    console.log(`BCH Deposit Address: ${bchAddress.networks[0].address}\nNetwork: ${bchAddress.networks[0].network}`);
}

// Get deposit address for Doge
const dogeAddress: CoinDepositAddressResponse = await coinspot.coinDepositAddress('DOGE');
if (dogeAddress.status == "ok") {
    console.log(`DOGE Deposit Address: ${dogeAddress.networks[0].address}\nNetwork: ${dogeAddress.networks[0].network}`);
}

// DOGE balance in DOGE and AUD
const dogeBalance: MyCoinBalanceResponse = await coinspot.coinBalance('DOGE');
if (dogeBalance.status == "ok") {
    console.log(`DOGE: ${dogeBalance.balance['DOGE']?.balance} AUD: $${dogeBalance.balance['DOGE']?.audbalance}`);
}

// Non existant coin
let unknownAddress: CoinDepositAddressResponse;
try {
    unknownAddress = await coinspot.coinDepositAddress('INVALIDCOIN');
}
catch (err: any) {
    console.log(`COIN: INVALIDCOIN: Oops: ${err?.message}`);
}
```

### Advanced Usage

The wrapper provides separate classes for different levels of API access:

- `CoinspotPublicApi`: For public endpoints (no authentication required)
- `CoinspotReadOnlyApi`: For read-only authenticated endpoints
- `CoinspotApi`: For full access authenticated endpoints

You can access these classes directly through the main `Coinspot` instance:

```typescript
import { Coinspot } from 'coinspot-v2-api';

const coinspot = new Coinspot(API_KEY, API_SECRET);

// Public API
const latestPrices = await coinspot.public.getLatestPrices();

// Read-only API
const myBalances = await coinspot.readOnly.getMyCoinBalances();

// Full access API
const buyQuote = await coinspot.authenticated.getBuyNowQuote('BTC', 0.1, 'coin');
```

## API Documentation

### Coinspot Class

The `Coinspot` class provides a high-level API for common operations:

- `latestPrices()`: Get latest prices for all coins
- `latestCoinPrice(coin: string)`: Get latest price for a specific coin
- `latestBuyPrice(coin: string)`: Get latest buy price for a specific coin
- `latestSellPrice(coin: string)`: Get latest sell price for a specific coin
- `openOrderList(coin: string)`: Get open orders for a specific coin
- `completedOrderList(coin: string)`: Get completed orders for a specific coin
- `coinBalance(coin: string)`: Get balance for a specific coin
- `balance()`: Get balances for all coins
- `coinDepositAddress(coin: string)`: Get deposit address for a specific coin
- `marketBuyOrder(coin: string, amount: number, rate: number)`: Place a market buy order
- `marketSellOrder(coin: string, amount: number, rate: number)`: Place a market sell order
- `buyNowOrder(coin: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a buy now order
- `sellNowOrder(coin: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a sell now order
- `swapNow(cointypesell: string, cointypebuy: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a swap order
- ... (other high-level methods)

### CoinspotPublicApi Class

Provides access to public endpoints:

- `getLatestPrices()`: Get latest prices for all coins
- `getLatestCoinPrice(cointype: string)`: Get latest price for a specific coin
- `getLatestCoinMarketPrice(cointype: string, markettype: string)`: Get latest price for a specific coin in a specific market
- `getLatestBuyPrice(cointype: string)`: Get latest buy price for a specific coin
- `getLatestSellPrice(cointype: string)`: Get latest sell price for a specific coin
- `getOpenOrders(cointype: string)`: Get open orders for a specific coin
- `getCompletedOrders(cointype: string)`: Get completed orders for a specific coin

### CoinspotReadOnlyApi Class

Provides access to read-only authenticated endpoints:

- `checkReadOnlyApiStatus()`: Check the status of the API
- `getMyCoinBalances()`: Get user's coin balances
- `getMyCoinBalance(cointype: string, available: string)`: Get user's balance for a specific coin
- `getMyOpenMarketOrders(cointype?: string, markettype?: string)`: Get user's open market orders
- `getMyOpenLimitOrders(cointype?: string)`: Get user's open limit orders
- `getMyOrderHistory(cointype?: string, markettype?: string, startdate?: string, enddate?: string, limit?: number)`: Get user's order history
- `getMySendReceiveHistory(startdate?: string, enddate?: string)`: Get user's send and receive history

### CoinspotApi Class

Provides access to full authenticated endpoints:

- `checkFullAccessApiStatus()`: Check the status of the API
- `getCoinDepositAddress(cointype: string)`: Get deposit address for a specific coin
- `getBuyNowQuote(cointype: string, amount: number, amounttype: string)`: Get quote for buying a specific coin
- `getSellNowQuote(cointype: string, amount: number, amounttype: string)`: Get quote for selling a specific coin
- `getSwapNowQuote(cointypesell: string, cointypebuy: string, amount: number)`: Get quote for swapping coins
- `placeMarketBuyOrder(cointype: string, amount: number, rate: number, markettype?: string)`: Place a market buy order
- `placeMarketSellOrder(cointype: string, amount: number, rate: number, markettype?: string)`: Place a market sell order
- `placeBuyNowOrder(cointype: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a buy now order
- `placeSellNowOrder(cointype: string, amounttype: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a sell now order
- `placeSwapNowOrder(cointypesell: string, cointypebuy: string, amount: number, rate?: number, threshold?: number, direction?: string)`: Place a swap now order
- ... (other authenticated API methods)

## Error Handling

The wrapper provides detailed error responses. Always wrap your API calls in try-catch blocks:

```typescript
try {
  const result = await coinspot.someApiMethod();
  // Handle successful result
} catch (error) {
  console.error('API call failed:', error);
  // Handle error appropriately
}
```

## Testing

The project includes comprehensive test suites for public, read-only, and authenticated APIs. To run the tests:

1. Set up your environment variables:
   - Create a `.env` file in the project root
   - Add your Coinspot API key and secret:
     ```
     COINSPOT_API_KEY=your_api_key
     COINSPOT_API_SECRET=your_api_secret
     ```

2. Run the tests:
   ```bash
   npm test
   ```

Note: The tests for authenticated APIs will perform actual API calls using your credentials. Ensure you're using a test account or be cautious when running these tests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [BSD-3-Clause License](LICENSE).

