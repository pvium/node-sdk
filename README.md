# Pvium TypeScript SDK

TypeScript SDK for Pvium API operations.

## Package

Published package name:

`@dephizee/pvium-sdk`

## Install

```bash
npm install @dephizee/pvium-sdk
```

## Build

```bash
npm run build
```

## Quick Start

```ts
import { createPviumSdk } from "@dephizee/pvium-sdk";

const sdk = createPviumSdk({
  baseUrl: "https://api-sandbox.pvium.com/v1",
  apiKey: process.env.PVIUM_API_KEY as string,
});

async function run() {
  const contracts = await sdk.endpoints.listContracts();
  console.log(contracts.meta.success, contracts.data.length);
}

run().catch(console.error);
```

## Base URLs

- Sandbox: `https://api-sandbox.pvium.com/v1`
- Production: `https://api.pvium.com/v1`

## Configuration

`createPviumSdk(config)` requires:

- `apiKey` (required)

Optional config:

- `baseUrl`
- `timeoutMs`
- `fetchFn`
- `defaultHeaders`

## Available Endpoints

- `createContract(body)`
- `listContracts()`
- `getInvoiceStatus(code)`
- `getInstallmentPayments(id)`

## Real Network Tests

Integration tests in `test/endpoints.test.js` call real endpoints (no mocked responses).

Run tests:

```bash
npm run build
node --test test/**/*.test.js
```

Recommended environment variables:

- `PVIUM_API_KEY`
- `PVIUM_BASE_URL`

Example:

```bash
export PVIUM_API_KEY="your_api_key"
export PVIUM_BASE_URL="https://api-sandbox.pvium.com/v1"
npm run build && node --test test/**/*.test.js
```

## Notes

- Responses are parsed JSON payloads from the API.
- Path handling prevents duplicate `/v1` when your base URL already ends with `/v1`.
