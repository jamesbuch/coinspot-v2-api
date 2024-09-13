import { AuthenticatedCoinspotReadOnlyApi } from '../src/authenticatedReadOnlyApi';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.COINSPOT_API_KEY;
const API_SECRET = process.env.COINSPOT_API_SECRET;

if (!API_KEY || !API_SECRET) {
    throw new Error('API key and secret must be set in .env file');
}

const api = new AuthenticatedCoinspotReadOnlyApi(API_KEY, API_SECRET);

describe('Authenticated Read-Only API', () => {
    const testCoin = 'btc';

    test('getReadOnlyStatus', async () => {
        const result = await api.getReadOnlyStatus();
        expect(result.status).toBe('ok');
    });

    test('getBalances', async () => {
        const result = await api.getBalances();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(result.balances).toBeDefined();
        expect(Array.isArray(result.balances)).toBe(true);
        if (result.balances.length > 0) {
            const firstBalance = result.balances[0];
            const [coin, balance] = Object.entries(firstBalance)[0];
            expect(typeof coin).toBe('string');
            expect(typeof balance.balance).toBe('number');
            expect(typeof balance.audbalance).toBe('number');
            expect(typeof balance.rate).toBe('number');

            expect(balance.balance).toBeGreaterThanOrEqual(0);
            expect(balance.audbalance).toBeGreaterThanOrEqual(0);
        }
    });

    test('getSingleCoinBalance', async () => {
        const result = await api.getSingleCoinBalance(testCoin, 'yes');
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(result.balance).toBeDefined();
        const balance = result.balance[testCoin.toUpperCase()];

        expect(typeof balance.balance).toBe('number');
        expect(typeof balance.available).toBe('number');
        expect(typeof balance.audbalance).toBe('number');
        expect(typeof balance.rate).toBe('number');

        expect(balance.balance).toBeGreaterThanOrEqual(0);
        expect(balance.audbalance).toBeGreaterThanOrEqual(0);
    });

    test('getOpenMarketOrders', async () => {
        const result = await api.getOpenMarketOrders(testCoin);
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getCompletedMarketOrders', async () => {
        const result = await api.getCompletedMarketOrders({ cointype: testCoin });
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getMyOpenMarketOrders', async () => {
        const result = await api.getMyOpenMarketOrders(testCoin);
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getMyOpenLimitOrders', async () => {
        const result = await api.getMyOpenLimitOrders(testCoin);
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getMyOrderHistory', async () => {
        const result = await api.getMyOrderHistory({ cointype: testCoin });
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getMyMarketOrderHistory', async () => {
        const result = await api.getMyMarketOrderHistory({ cointype: testCoin });
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);
    });

    test('getMySendReceiveHistory', async () => {
        const result = await api.getMySendReceiveHistory();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.sendtransactions)).toBe(true);
        expect(Array.isArray(result.receivetransactions)).toBe(true);
    });

    test('getMyDepositHistory', async () => {
        const result = await api.getMyDepositHistory();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.deposits)).toBe(true);
    });

    test('getMyWithdrawalHistory', async () => {
        const result = await api.getMyWithdrawalHistory();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.withdrawals)).toBe(true);
    });
});
