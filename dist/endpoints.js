"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PviumEndpoints = void 0;
class PviumEndpoints {
    constructor(http) {
        this.http = http;
    }
    async createContract(body, options) {
        const response = await this.http.request({
            method: "POST",
            path: "/v1/invoices",
            body,
            options,
        });
        return this.http.parseResponseBody(response);
    }
    async listContracts(options) {
        const response = await this.http.request({
            method: "GET",
            path: "/v1/invoices",
            options,
        });
        return this.http.parseResponseBody(response);
    }
    async getInvoiceStatus(code, options) {
        const response = await this.http.request({
            method: "GET",
            path: `/v1/invoices/${encodeURIComponent(code)}/status`,
            options,
        });
        return this.http.parseResponseBody(response);
    }
    async getInstallmentPayments(id, options) {
        const response = await this.http.request({
            method: "GET",
            path: `/v1/payment-installments/${encodeURIComponent(String(id))}/payments`,
            options,
        });
        return this.http.parseResponseBody(response);
    }
}
exports.PviumEndpoints = PviumEndpoints;
