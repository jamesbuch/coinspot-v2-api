import { Coinspot } from '../index.js';
import dotenv from 'dotenv';

async function main() {
    dotenv.config();
    const API_KEY = process.env['COINSPOT_API_KEY'];
    const API_SECRET = process.env['COINSPOT_API_SECRET'];

    if (!API_KEY || !API_SECRET) {
        console.error('API key or secret not found in environment variables');
        return;
    }

    const coinspot = new Coinspot(API_KEY, API_SECRET);

    try {
        const prices = await coinspot.latestPrices();
        console.log('Latest prices:', prices);

        const bitcoins = await coinspot.latestCoinPrice('btc');
        console.log('Bitcoin price:', bitcoins);

        const ethers = await coinspot.latestCoinPrice('eth');
        console.log('Ethereum price:', ethers);

        const coins = ['btc', 'eth', 'bch', 'ltc', 'doge'];
        for (const coin of coins) {
            const addr = await coinspot.coinDepositAddress(coin);
            for (const network of addr.networks) {
                console.log(`${coin.toUpperCase()}: ${network.address}`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main().catch(console.error);