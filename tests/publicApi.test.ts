// tests/publicApi.test.ts

import {
    CoinspotPublicApi
} from '../src/publicApi';

const api = new CoinspotPublicApi();

describe('Public API', () => {
    const testCoin = 'doge';

    test('getLatestPrices', async () => {
        const result = await api.getLatestPrices();
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(result.prices).toBeDefined();
        if (result.prices) {
            expect(Object.keys(result.prices).length).toBeGreaterThan(0);
            const firstCoin = Object.values(result.prices)[0];
            expect(firstCoin).toHaveProperty('bid');
            expect(firstCoin).toHaveProperty('ask');
            expect(firstCoin).toHaveProperty('last');
            expect(parseFloat(firstCoin.bid)).toBeGreaterThan(0);
            expect(parseFloat(firstCoin.ask)).toBeGreaterThan(0);
            expect(parseFloat(firstCoin.last)).toBeGreaterThan(0);
        }
    });

    test('getLatestCoinPrice', async () => {
        const result = await api.getLatestCoinPrice(testCoin);
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        if (result.prices) {
            expect(parseFloat(result.prices.bid)).toBeGreaterThan(0);
            expect(parseFloat(result.prices.ask)).toBeGreaterThan(0);
            expect(parseFloat(result.prices.last)).toBeGreaterThan(0);
        }
    });

    test('getLatestBuyPrice', async () => {
        const result = await api.getLatestBuyPrice(testCoin);
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        if (result.rate) {
            expect(parseFloat(result.rate)).toBeGreaterThan(0);
        }
        expect(result.market).toBe(`${testCoin.toUpperCase()}/AUD`);
    });

    test('getLatestSellPrice', async () => {
        const result = await api.getLatestSellPrice(testCoin);
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        if (result.rate) {
            expect(parseFloat(result.rate)).toBeGreaterThan(0);
        }
        expect(result.market).toBe(`${testCoin.toUpperCase()}/AUD`);
    });

    test('Invalid coin handling', async () => {
        const result = await api.getLatestCoinPrice('invalidcoin');
        expect(result.status).toBe('ok');
        expect(result.prices).toBeUndefined();
    });

    test('getOpenOrders', async () => {
        const result = await api.getOpenOrders(testCoin);
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);

        if (result.buyorders.length > 0) {
            const firstBuyOrder = result.buyorders[0];
            expect(firstBuyOrder).toHaveProperty('amount');
            expect(firstBuyOrder).toHaveProperty('rate');
            expect(firstBuyOrder).toHaveProperty('total');
            expect(firstBuyOrder).toHaveProperty('coin');
            expect(firstBuyOrder).toHaveProperty('market');
        }

        if (result.sellorders.length > 0) {
            const firstSellOrder = result.sellorders[0];
            expect(firstSellOrder).toHaveProperty('amount');
            expect(firstSellOrder).toHaveProperty('rate');
            expect(firstSellOrder).toHaveProperty('total');
            expect(firstSellOrder).toHaveProperty('coin');
            expect(firstSellOrder).toHaveProperty('market');
        }
    });

    test('getCompletedOrders', async () => {
        const result = await api.getCompletedOrders(testCoin);
        expect(result).toBeDefined();
        expect(result.status).toBe('ok');
        if (result.status !== 'ok') {
            expect(result.message).toBeDefined();
        }
        expect(Array.isArray(result.buyorders)).toBe(true);
        expect(Array.isArray(result.sellorders)).toBe(true);

        if (result.buyorders.length > 0) {
            const firstBuyOrder = result.buyorders[0];
            expect(firstBuyOrder).toHaveProperty('amount');
            expect(firstBuyOrder).toHaveProperty('rate');
            expect(firstBuyOrder).toHaveProperty('total');
            expect(firstBuyOrder).toHaveProperty('coin');
            expect(firstBuyOrder).toHaveProperty('market');
            expect(firstBuyOrder).toHaveProperty('solddate');
        }

        if (result.sellorders.length > 0) {
            const firstSellOrder = result.sellorders[0];
            expect(firstSellOrder).toHaveProperty('amount');
            expect(firstSellOrder).toHaveProperty('rate');
            expect(firstSellOrder).toHaveProperty('total');
            expect(firstSellOrder).toHaveProperty('coin');
            expect(firstSellOrder).toHaveProperty('market');
            expect(firstSellOrder).toHaveProperty('solddate');
        }
    });
});