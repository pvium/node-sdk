import { RequestOptions } from "./types";
export interface PviumSdkConfig {
    baseUrl?: string;
    apiKey: string;
    timeoutMs?: number;
    fetchFn?: typeof fetch;
    defaultHeaders?: Record<string, string>;
}
export interface HttpRequestConfig {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    query?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
    options?: RequestOptions;
}
export declare const PVIUM_BASE_URLS: {
    readonly test: "http://localhost:4005/v1";
    readonly sandbox: "https://api-sandbox.pvium.com/v1";
    readonly production: "https://api.pvium.com/v1";
};
export declare class PviumHttpClient {
    private readonly baseUrl;
    private readonly timeoutMs;
    private readonly fetchFn;
    private apiKey?;
    private readonly defaultHeaders;
    constructor(config: PviumSdkConfig);
    setApiKey(key?: string): void;
    request(config: HttpRequestConfig): Promise<Response>;
    private buildUrl;
    private normalizePath;
    parseResponseBody<T>(response: Response): Promise<T>;
}
