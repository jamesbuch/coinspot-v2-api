import { AuthenticatedCoinspotApi } from '../src/authenticatedApi';

describe('Authenticated API', () => {

    let API_KEY: string;
    let API_SECRET: string;

    beforeAll(async () => {
        try {
            const dotenv = await import('dotenv');
            dotenv.config();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            console.log('dotenv not found, skipping .env file loading');
        }
    
        API_KEY = process.env.COINSPOT_API_KEY!;
        API_SECRET = process.env.COINSPOT_API_SECRET!;
    
        if (!API_KEY || !API_SECRET) {
            throw new Error('COINSPOT_API_KEY and COINSPOT_API_SECRET must be set in environment variables or .env file');
        }
    });

    const testCoin = 'doge';

    test('getCoinWithdrawalDetails', async () => {
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);

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
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);
        const result = await api.getStatus();
        expect(result.status).toBe('ok');
    });

    test('getCoinDepositAddress', async () => {
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);
        const result = await api.getCoinDepositAddress(testCoin);
        expect(result.status).toBe('ok');
        expect(Array.isArray(result.networks)).toBe(true);
        expect(result.networks.length).toBeGreaterThan(1);
    });

    test('getBuyNowQuote', async () => {
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);
        const result = await api.getBuyNowQuote(testCoin, 0.001, 'coin');
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });

    test('getSellNowQuote', async () => {
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);
        const result = await api.getSellNowQuote(testCoin, 0.001, 'coin');
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });

    test('getSwapNowQuote', async () => {
        const api = new AuthenticatedCoinspotApi(API_KEY, API_SECRET);
        const result = await api.getSwapNowQuote(testCoin, 'eth', 0.1);
        expect(result.status).toBe('ok');
        expect(result.rate).toBeDefined();
    });
});
