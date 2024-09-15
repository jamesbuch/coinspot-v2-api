export declare class CoinspotApiBase {
    protected key: string;
    protected secret: string;
    constructor(key: string, secret: string);
    protected request<T>(path: string, data?: any, readOnly?: boolean): Promise<T>;
}
//# sourceMappingURL=coinspotApiBase.d.ts.map