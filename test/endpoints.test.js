const test = require("node:test");
const assert = require("node:assert/strict");

const { createPviumSdk } = require("../dist/index.js");
const PVIUM_API_KEY = "pk_sand_....";
const installmentId = 42232;
const contractCode = "INV-83182843-1f9f-4bb2-b343-2bd64f85f434";

function createLiveSdk() {
    return createPviumSdk({
        baseUrl: "http://localhost:4005/v1",
        apiKey: PVIUM_API_KEY,
    });
}

function assertMetaEnvelope(result) {
    assert.equal(typeof result, "object");
    assert.equal(typeof result.meta, "object");
    assert.equal(typeof result.meta.statusCode, "number");
    assert.equal(typeof result.meta.success, "boolean");
}

test("listContracts makes actual network call", async () => {
    const sdk = createLiveSdk();
    const result = await sdk.endpoints.listContracts();

    assertMetaEnvelope(result);
    if (result.meta.success) {
        assert.equal(Array.isArray(result.data), true);
    }
});

test("getInvoiceStatus makes actual network call", async () => {
    const sdk = createLiveSdk();
    const result = await sdk.endpoints.getInvoiceStatus(contractCode);

    assertMetaEnvelope(result);
    if (result.meta.success) {
        assert.equal(typeof result.data.contractCode, "string");
        assert.equal(result.data.contractCode.length > 0, true);
    }
});

test("getInstallmentPayments makes actual network call", async () => {
    const sdk = createLiveSdk();
    const result = await sdk.endpoints.getInstallmentPayments(installmentId);

    assertMetaEnvelope(result);
    if (result.meta.success) {
        assert.equal(Array.isArray(result.data), true);
    }
});

test("createContract makes actual network call", async () => {
    const sdk = createLiveSdk();
    const now = Date.now();

    const payload = {
        name: `SDK Test ${now}`,
        description: "Integration test invoice",
        amount: 50,
        dueDate: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
        amountType: "Flat",
        discount: 0,
        discountType: "Flat",
        tax: 0,
        documentNumber: now,
    };

    const result = await sdk.endpoints.createContract(payload);

    assertMetaEnvelope(result);
});
