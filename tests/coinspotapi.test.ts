import { CoinspotApi } from '../src/coinspotApi';
import { expect } from 'chai';
import 'mocha';

// Dynamically import dotenv if it's available
async function loadEnv() {
    try {
        const dotenv = await import('dotenv');
        dotenv.config();
        // console.log('Loaded environment variables from .env file');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.log('No .env file found, assuming environment variables are set');
    }
}

describe('Coinspot Authenticated API', () => {
    let api: CoinspotApi;

    before(async () => {
        await loadEnv();
        const key = process.env['COINSPOT_API_KEY'] as string;
        const secret = process.env['COINSPOT_API_SECRET'] as string;
        if (!key || !secret) {
            throw new Error('API key or secret not found in environment variables');
        }
        api = new CoinspotApi(key, secret);
    });

    it('should check full access API status', async () => {
        const response = await api.checkFullAccessApiStatus();
        expect(response.status).to.equal('ok');
    });

    it('should get deposit address for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getCoinDepositAddress(cointype);
        expect(response.status).to.equal('ok');
        expect(response.networks).to.be.an('array');
    });

    it('should get buy now quote', async () => {
        const cointype = 'BTC';
        const amount = 0.01;
        const amounttype = 'coin';
        const response = await api.getBuyNowQuote(cointype, amount, amounttype);
        expect(response.status).to.equal('ok');
        expect(response.rate).to.be.a('number');
    });

    it('should get sell now quote', async () => {
        const cointype = 'BTC';
        const amount = 0.01;
        const amounttype = 'coin';
        const response = await api.getSellNowQuote(cointype, amount, amounttype);
        expect(response.status).to.equal('ok');
        expect(response.rate).to.be.a('number');
    });

    it('should get swap now quote', async () => {
        const cointypesell = 'BTC';
        const cointypebuy = 'ETH';
        const amount = 0.01;
        const response = await api.getSwapNowQuote(cointypesell, cointypebuy, amount);
        expect(response.status).to.equal('ok');
        expect(response.rate).to.be.a('number');
    });
});
