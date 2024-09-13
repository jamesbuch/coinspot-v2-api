import dotenv from 'dotenv';
import { AuthenticatedCoinspotApi } from '../src/authenticatedApi';

dotenv.config();

const API_KEY = process.env.COINSPOT_API_KEY;
const API_SECRET = process.env.COINSPOT_API_SECRET;

if (!API_KEY || !API_SECRET) {
    throw new Error('API key and secret must be set in .env file');
}

const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);

describe('Authenticated API', () => {
    const testCoin = 'btc';

    test('getCoinWithdrawalDetails', async () => {
        const result = await api.getCoinWithdrawalDetails(testCoin);
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.networks)).toBe(true);
        if (result.networks.length > 0) {
            const firstNetwork = result.networks[0];
            expect(firstNetwork).toHaveProperty('network');
            expect(firstNetwork).toHaveProperty('paymentid');
            expect(firstNetwork).toHaveProperty('fee');
            expect(firstNetwork).toHaveProperty('minsend');
            expect(firstNetwork).toHaveProperty('default');
            expect(typeof firstNetwork.fee).toBe('number');
            expect(typeof firstNetwork.minsend).toBe('number');
            expect(typeof firstNetwork.default).toBe('boolean');
        }
    });

    test('getStatus', async () => {
        const result = await api.getStatus();
        expect(result.status).toBe('ok');
    });

    test('getCoinDepositAddress', async () => {
        const result = await api.getCoinDepositAddress(testCoin);
        expect(result.status).toBe('ok');
        expect(Array.isArray(result.networks)).toBe(true);
        expect(result.networks.length).toBeGreaterThan(1);
    });

    test('getBuyNowQuote', async () => {
        const result = await api.getBuyNowQuote(testCoin, 0.001, 'coin');
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });

    test('getSellNowQuote', async () => {
        const result = await api.getSellNowQuote(testCoin, 0.001, 'coin');
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });

    test('getSwapNowQuote', async () => {
        const result = await api.getSwapNowQuote(testCoin, 'eth', 0.1);
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });
});
