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

## SmartEscrow Signing Utilities

The SDK now includes signing helpers that mirror the hashing/signature patterns used in SmartEscrow tests.

### Supported Helpers

- `signCreateProjectRequest(payload, signerOrPrivateKey, options)`
- `signCreateProjectAttestation(appSignature, signerOrPrivateKey, chainId)`
- `signCreateClaimRequest(payload, signerOrPrivateKey)`
- `signFinalizeClaimRequest(claims, signerOrPrivateKey, chainId)`
- `signRelayedCallRequest(payload, signerOrPrivateKey)`
- `signDisputeRequest(claimId, signerOrPrivateKey, chainId)`
- `signResolveDisputeRequest(payload, signerOrPrivateKey)`

### Private Key Example

```ts
import {
  signCreateClaimRequest,
  signCreateProjectRequest,
} from "@dephizee/pvium-sdk";

const privateKey = process.env.APP_PRIVATE_KEY as string;
const chainId = 84532n;

const projectSignature = await signCreateProjectRequest(
  {
    app: "test-app",
    projectId: "project-001",
    metadata: "ipfs://Qm...",
    tokenAddress: "0x0000000000000000000000000000000000000001",
    refundAddress: "0x0000000000000000000000000000000000000002",
    appFeeAddress: "0x0000000000000000000000000000000000000003",
    appAdminAddress: "0x0000000000000000000000000000000000000004",
    appFeeBps: 200,
    disputeWindowSeconds: 259200,
    lockDuration: 7776000,
    minimumBalancePerVendor: 100000000n,
  },
  privateKey,
  {
    pviumFeeBps: 100,
    chainId,
  },
);

const claimSignature = await signCreateClaimRequest(
  {
    app: "test-app",
    projectId: "project-001",
    claimId: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    receiver: "0x0000000000000000000000000000000000000005",
    amount: 100000000n,
    claimableAfter: Math.floor(Date.now() / 1000),
    claimDeadline: 0,
    nonce: 0,
  },
  privateKey,
);

console.log(projectSignature, claimSignature);
```

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
