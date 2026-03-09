import { PviumHttpClient } from "./client";
import {
  CreateContractRequest,
  RequestOptions,
  CreateContractResponse,
  ListContractsResponse,
  InvoiceStatusResponse,
  InstallmentPaymentsResponse,
} from "./types";

export class PviumEndpoints {
  constructor(private readonly http: PviumHttpClient) {}

  async createContract(
    body: CreateContractRequest,
    options?: RequestOptions,
  ): Promise<CreateContractResponse> {
    const response = await this.http.request({
      method: "POST",
      path: "/v1/invoices",
      body,
      options,
    });
    return this.http.parseResponseBody<CreateContractResponse>(response);
  }

  async listContracts(
    options?: RequestOptions,
  ): Promise<ListContractsResponse> {
    const response = await this.http.request({
      method: "GET",
      path: "/v1/invoices",
      options,
    });
    return this.http.parseResponseBody<ListContractsResponse>(response);
  }

  async getInvoiceStatus(
    code: string,
    options?: RequestOptions,
  ): Promise<InvoiceStatusResponse> {
    const response = await this.http.request({
      method: "GET",
      path: `/v1/invoices/${encodeURIComponent(code)}/status`,
      options,
    });

    return this.http.parseResponseBody<InvoiceStatusResponse>(response);
  }

  async getInstallmentPayments(
    id: number,
    options?: RequestOptions,
  ): Promise<InstallmentPaymentsResponse> {
    const response = await this.http.request({
      method: "GET",
      path: `/v1/payment-installments/${encodeURIComponent(String(id))}/payments`,
      options,
    });

    return this.http.parseResponseBody<InstallmentPaymentsResponse>(response);
  }
}
