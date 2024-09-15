import { CoinspotReadOnlyApi } from '../src/coinspotReadOnlyApi';
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

describe('Coinspot Read-Only Authenticated API', () => {
    let api: CoinspotReadOnlyApi;

    before(async () => {
        await loadEnv();
        const key = process.env['COINSPOT_API_KEY'] as string;
        const secret = process.env['COINSPOT_API_SECRET'] as string;
        if (!key || !secret) {
            throw new Error('API key or secret not found in environment variables');
        }
        api = new CoinspotReadOnlyApi(key, secret);
    });

    it('should check read-only API status', async () => {
        const response = await api.checkReadOnlyApiStatus();
        expect(response.status).to.equal('ok');
    });

    it('should get user\'s coin balances', async () => {
        // const cointype = 'DOGE';
        const response = await api.getMyCoinBalances();
        expect(response.status).to.equal('ok');
        expect(response.balances).to.be.an('array');
        expect(response.balances).to.have.lengthOf.greaterThanOrEqual(1);
    });

    it('should get user\'s coin balance for a specific coin', async () => {
        const cointype = 'DOGE';
        const available = 'yes';
        const response = await api.getMyCoinBalance(cointype, available);
        expect(response.status).to.equal('ok');
        expect(response.balance).to.be.an('object');
        expect(response.balance[cointype]).to.have.property('balance');
        expect(response.balance[cointype]?.balance).to.be.greaterThanOrEqual(10.0);
    });

    it('should get user\'s open market orders', async () => {
        const response = await api.getMyOpenMarketOrders();
        expect(response.status).to.equal('ok');
        expect(response.buyorders).to.be.an('array');
        expect(response.sellorders).to.be.an('array');
    });

    it('should get user\'s open limit orders', async () => {
        const response = await api.getMyOpenLimitOrders();
        expect(response.status).to.equal('ok');
        expect(response.buyorders).to.be.an('array');
        expect(response.sellorders).to.be.an('array');
    });

    it('should get user\'s order history', async () => {
        const response = await api.getMyOrderHistory();
        expect(response.status).to.equal('ok');
        expect(response.buyorders).to.be.an('array');
        expect(response.sellorders).to.be.an('array');
    });

    it('should get user\'s send and receive history', async () => {
        const response = await api.getMySendReceiveHistory();
        expect(response.status).to.equal('ok');
        expect(response.sendtransactions).to.be.an('array');
        expect(response.receivetransactions).to.be.an('array');
    });
});
