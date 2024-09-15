import { CoinspotPublicApi } from '../src/coinspotPublicApi';
import { expect } from 'chai';
import 'mocha';

describe('Coinspot Public API', () => {
    let api: CoinspotPublicApi;

    before(() => {
        api = new CoinspotPublicApi();
    });

    it('should get latest prices for all coins', async () => {
        const response = await api.getLatestPrices();
        expect(response.status).to.equal('ok');
        expect(response.prices).to.be.an('object');
    });

    it('should get latest price for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getLatestCoinPrice(cointype);
        expect(response.status).to.equal('ok');
        expect(response.prices).to.have.all.keys('bid', 'ask', 'last');
    });

    it('should get latest price for a specific coin in a specific market', async () => {
        const cointype = 'BTC';
        const markettype = 'USDT';
        const response = await api.getLatestCoinMarketPrice(cointype, markettype);
        expect(response.status).to.equal('ok');
        expect(response.prices).to.have.all.keys('bid', 'ask', 'last');
    });

    it('should get latest buy price for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getLatestBuyPrice(cointype);
        expect(response.status).to.equal('ok');
        expect(response.rate).to.be.a('string');
        expect(parseFloat(response.rate)).to.be.greaterThanOrEqual(1000.00);
    });

    it('should get latest sell price for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getLatestSellPrice(cointype);
        expect(response.status).to.equal('ok');
        expect(response.rate).to.be.a('string');
        expect(parseFloat(response.rate)).to.be.greaterThanOrEqual(1000.00);
    });

    it('should get open orders for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getOpenOrders(cointype);
        expect(response.status).to.equal('ok');
        expect(response.buyorders).to.be.an('array');
        expect(response.sellorders).to.be.an('array');
    });

    it('should get completed orders for a specific coin', async () => {
        const cointype = 'BTC';
        const response = await api.getCompletedOrders(cointype);
        expect(response.status).to.equal('ok');
        expect(response.buyorders).to.be.an('array');
        expect(response.sellorders).to.be.an('array');
    });
});