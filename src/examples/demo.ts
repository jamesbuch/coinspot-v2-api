import { Coinspot } from '../index';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env['COINSPOT_API_KEY'];
const API_SECRET = process.env['COINSPOT_API_SECRET'];

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
