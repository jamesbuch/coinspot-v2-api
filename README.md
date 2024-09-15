# Coinspot V2 API Wrapper

Apologies to everyone who downloaded and tried to use earlier versions!  I had to fix a lot of configuration
and other problems, and still now there are annoyances such as some values from the API being returned as
a string when you would expect a number.  Still...

A comprehensive TypeScript wrapper for the Coinspot V2 API, providing easy access to public, read-only, and authenticated endpoints.

TypeScript types are provided in the distribution package, and comprehensive JSDoc comments are included too.

Please also see the test suite for reference.

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

```typescript
import Coinspot from 'coinspot-v2-api';

const API_KEY = 'your_api_key';
const API_SECRET = 'your_api_secret';

const coinspot = new Coinspot(API_KEY, API_SECRET);

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

### Advanced Usage

The wrapper provides separate classes for different levels of API access:

- `CoinspotPublicApi`: For public endpoints (no authentication required)
- `CoinspotReadOnlyApi`: For read-only authenticated endpoints
- `CoinspotApi`: For full access authenticated endpoints

You can access these classes directly through the main `Coinspot` instance:

```typescript
import Coinspot from 'coinspot-v2-api';

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

