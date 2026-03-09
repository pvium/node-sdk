"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PviumHttpClient = exports.PVIUM_BASE_URLS = void 0;
exports.PVIUM_BASE_URLS = {
    test: "http://localhost:4005/v1",
    sandbox: "https://api-sandbox.pvium.com/v1",
    production: "https://api.pvium.com/v1",
};
const DEFAULT_BASE_URL = exports.PVIUM_BASE_URLS.production;
class PviumHttpClient {
    constructor(config) {
        this.baseUrl = (config.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "");
        this.timeoutMs = config.timeoutMs ?? 30000;
        this.fetchFn = config.fetchFn ?? fetch;
        this.apiKey = config.apiKey;
        this.defaultHeaders = config.defaultHeaders ?? {};
    }
    setApiKey(key) {
        this.apiKey = key;
    }
    async request(config) {
        const url = this.buildUrl(config.path, config.query);
        const headers = {
            Accept: "application/json",
            ...this.defaultHeaders,
            ...config.options?.headers,
        };
        if (this.apiKey) {
            headers["x-api-key"] = this.apiKey;
        }
        if (config.body !== undefined) {
            headers["Content-Type"] = "application/json";
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
        try {
            const response = await this.fetchFn(url, {
                method: config.method,
                headers,
                body: config.body !== undefined ? JSON.stringify(config.body) : undefined,
                signal: config.options?.signal ?? controller.signal,
            });
            return response;
        }
        finally {
            clearTimeout(timeout);
        }
    }
    buildUrl(path, query) {
        const normalizedPath = this.normalizePath(path);
        const url = new URL(`${this.baseUrl}${normalizedPath}`);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value === undefined || value === null) {
                    continue;
                }
                url.searchParams.set(key, String(value));
            }
        }
        return url.toString();
    }
    normalizePath(path) {
        if (!path.startsWith("/")) {
            return `/${path}`;
        }
        if (this.baseUrl.endsWith("/v1") && path.startsWith("/v1/")) {
            return path.slice(3);
        }
        return path;
    }
    async parseResponseBody(response) {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            return response.json();
        }
        const text = await response.text();
        return text.length > 0 ? text : null;
    }
}
exports.PviumHttpClient = PviumHttpClient;
