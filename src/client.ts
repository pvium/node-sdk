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

export const PVIUM_BASE_URLS = {
  test: "http://localhost:4005/v1",
  sandbox: "https://api-sandbox.pvium.com/v1",
  production: "https://api.pvium.com/v1",
} as const;

const DEFAULT_BASE_URL = PVIUM_BASE_URLS.production;

export class PviumHttpClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchFn: typeof fetch;
  private apiKey?: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: PviumSdkConfig) {
    this.baseUrl = (config.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "");
    this.timeoutMs = config.timeoutMs ?? 30000;
    this.fetchFn = config.fetchFn ?? fetch;
    this.apiKey = config.apiKey;
    this.defaultHeaders = config.defaultHeaders ?? {};
  }

  setApiKey(key?: string): void {
    this.apiKey = key;
  }

  async request(config: HttpRequestConfig): Promise<Response> {
    const url = this.buildUrl(config.path, config.query);
    const headers: Record<string, string> = {
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
        body:
          config.body !== undefined ? JSON.stringify(config.body) : undefined,
        signal: config.options?.signal ?? controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined | null>,
  ): string {
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

  private normalizePath(path: string): string {
    if (!path.startsWith("/")) {
      return `/${path}`;
    }

    if (this.baseUrl.endsWith("/v1") && path.startsWith("/v1/")) {
      return path.slice(3);
    }

    return path;
  }

  public async parseResponseBody<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    const text = await response.text();
    return text.length > 0 ? (text as unknown as T) : (null as unknown as T);
  }
}
