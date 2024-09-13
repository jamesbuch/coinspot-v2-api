# CoinSpot API v2

A TypeScript SDK for the CoinSpot cryptocurrency exchange API. This library provides a simple and intuitive interface to interact with both public and authenticated endpoints of the CoinSpot v2 API.

This is not an offical Coinspot project. I am just another Coinspot customer, and needed an API for a
simple trading bot project. The existing v1 API is a decade old, and so I had to roll my own.

See also [Coinspot API Documentation](https://www.coinspot.com.au/api).

## Features

- Full coverage of CoinSpot's public API endpoints
- Support for authenticated API calls (read-only and full access)
- TypeScript support for improved developer experience and type safety
- Comprehensive test suite
- Detailed logging for API calls during development and testing

## Installation

You can install this package using npm:

```bash
npm install coinspot-api-v2
```

## Usage

First, import the CoinSpot API:

```typescript
import { createCoinspotApi } from 'coinspot-v2-api';
```

### Public API

To use the public API (no authentication required):

```typescript
const api = createCoinspotApi();

// Get latest prices
const prices = await api.public.getLatestPrices();

// Get latest price for a specific coin
const btcPrice = await api.public.getLatestCoinPrice('BTC');
```

### Authenticated API

To use the authenticated API, you need to provide your API key and secret:

```typescript
const api = createCoinspotApi('your-api-key', 'your-api-secret');

// Get account balances
const balances = await api.readOnly.getBalances();

// Place a buy order
const order = await api.authenticated.placeMarketBuyOrder('BTC', 0.1, 50000);
```

### Simplified top-level API

This is probably the one you want to start with, see also [the demo](./examples/demo.ts).

```typescript
import { Coinspot } from 'coinspot-v2-api';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.COINSPOT_API_KEY;
const API_SECRET = process.env.COINSPOT_API_SECRET;

const coinspot = new Coinspot(API_KEY, API_SECRET);

const prices = await coinspot.latestPrices();
console.log(prices);

const bitcoins = await coinspot.latestCoinPrice('btc');
console.log(bitcoins);

const ethers = await coinspot.latestCoinPrice('eth');
console.log(ethers);

const btcaddr = await coinspot.coinDepositAddress('btc');
const ethaddr = await coinspot.coinDepositAddress('eth');
const bchaddr = await coinspot.coinDepositAddress('bch');
const ltcaddr = await coinspot.coinDepositAddress('ltc');
const dogeaddr = await coinspot.coinDepositAddress('doge');

for (const network of btcaddr.networks) {
    console.log(`BTC: ${network.address}`);
}

for (const network of ethaddr.networks) {
    console.log(`ETH: ${network.address}`);
}

for (const network of bchaddr.networks) {
    console.log(`BCH: ${network.address}`);
}

for (const network of ltcaddr.networks) {
    console.log(`LTC: ${network.address}`);
}

for (const network of dogeaddr.networks) {
    console.log(`DOGE: ${network.address}`);
}
```

<pre>
<code style="background-color: #0d1117; color: #c9d1d9; padding: 16px; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;">
192-168-1-31:coinspot-v2-api jamesbuchanan$ npm run dev

> coinspot-v2-api@1.0.0 dev
> node --loader ts-node/esm --experimental-specifier-resolution=node examples/demo.ts

(node:68905) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
{
  status: 'ok',
  prices: {
    btc: { bid: '88801', ask: '89481.1', last: '89491.05' },
    usdt: { bid: '1.490261', ask: '1.497901', last: '1.4979003' },
    ltc: { bid: '93.83', ask: '96.99', last: '96.99989' },
    doge: { bid: '0.158488', ask: '0.16027', last: '0.160399' },
    eth: { bid: '3581.65', ask: '3617.8', last: '3616.82171784' },
    sol: { bid: '198.24', ask: '205.9', last: '203.92' },
    powr: { bid: '0.29005', ask: '0.3', last: '0.29994996' },
    ans: { bid: '13.7', ask: '14.61', last: '14.60899996' },
    xrp: { bid: '0.84237', ask: '0.85', last: '0.84206316' },
    trx: { bid: '0.221331', ask: '0.224894', last: '0.225' },
    eos: { bid: '0.6903', ask: '0.9065', last: '0.6789' },
    str: { bid: '0.140894', ask: '0.167998', last: '0.144' },
    rfox: { bid: 'NaN', ask: 'NaN', last: '0.00539896' },
    gas: { bid: '4.995', ask: '5.005', last: '5.005' },
    ada: { bid: '0.525353', ask: '0.540065', last: '0.5415' },
    rhoc: { bid: '0.008005', ask: '0.023498', last: '0.023498' },
    btc_usdt: { bid: '57210', ask: '61111', last: '58000' }
  }
}
{
  status: 'ok',
  prices: { bid: '88801', ask: '89439.31', last: '89491.05' }
}
{
  status: 'ok',
  prices: { bid: '3581.05', ask: '3617.8', last: '3616.82171784' }
}
192-168-1-31:coinspot-v2-api jamesbuchanan$ 
</code>
</pre>

## API Documentation

### TODO:
For detailed API documentation, please refer to the [API Documentation](./docs/API.md) file.

## Development

To set up the project for development:

1. Clone the repository:
   ```
   git clone https://github.com/jamesbuch/coinspot-api-v2.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the test suite:
   ```
   npm test
   ```

## Testing

This project uses Jest for testing. To run the tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is not affiliated with or endorsed by Coinspot. Use at your own risk. The authors and contributors are not responsible for any financial losses or other damages incurred through the use of this software.

## Contact

James Buchanan - 140830722+jamesbuch@users.noreply.github.com

## Donations

If you want to help this and other similar projects, or need a Coinspot or other API SDK in another language,
like C#.NET, Java, Go, Python or high-performance C++, give me a yell.  I accept donations at:

<span style="color: #f7931a;">₿</span> <pre>1CundHTZwH9t32SjNGCZoWj18qpPAxp9wQ</pre>
<span style="color: #627eea; font-size: 24px;">Ξ</span> <pre>0x0ba2d032e17f1855abf16091b16cdb8ce3f442b6</pre>
<span style="color: #8dc351; font-size: 24px;">Ƀ</span> <pre>bitcoincash:qqamhn0rvmn4q5gdvpgxlzxngku7694nmgny5c0ql6</pre>
<span style="color: #c2a633; font-size: 24px;">Ð</span> <pre>D8hDbe3YX1umuvKKFukKNEhicDA8of5JCR</pre>
<span style="color: #bfbbbb; font-size: 24px;">Ł</span> <pre>MDfbEPjLVHe9wSVThWHpYBpvbhCc8NbW9V</pre>

### Project Links

[Github](https://github.com/jamesbuch/coinspot-api-v2)
[Coinspot APIv2 on NPM](https://www.npmjs.com/package/coinspot-v2-api)
