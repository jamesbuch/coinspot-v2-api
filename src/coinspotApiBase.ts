import axios, { AxiosRequestConfig } from 'axios';
import crypto from 'crypto';

export class CoinspotApiBase {
    protected key: string;
    protected secret: string;

    constructor(key: string, secret: string) {
        this.key = key;
        this.secret = secret;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async request<T>(path: string, data: any = {}, readOnly: boolean = false): Promise<T> {
        const nonce = Date.now();
        const payload = { ...data, nonce };
        const stringPayload = JSON.stringify(payload);

        const signature = crypto
            .createHmac('sha512', this.secret)
            .update(stringPayload)
            .digest('hex');

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `https://www.coinspot.com.au/api/v2${readOnly ? '/ro' : ''}${path}`,
            headers: {
                'Content-Type': 'application/json',
                'sign': signature,
                'key': this.key,
            },
            data: stringPayload,
        };

        const response = await axios(config);
        return response.data;
    }
}
