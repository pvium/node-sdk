import { PviumHttpClient } from "./client";
import { CreateContractRequest, RequestOptions, CreateContractResponse, ListContractsResponse, InvoiceStatusResponse, InstallmentPaymentsResponse } from "./types";
export declare class PviumEndpoints {
    private readonly http;
    constructor(http: PviumHttpClient);
    createContract(body: CreateContractRequest, options?: RequestOptions): Promise<CreateContractResponse>;
    listContracts(options?: RequestOptions): Promise<ListContractsResponse>;
    getInvoiceStatus(code: string, options?: RequestOptions): Promise<InvoiceStatusResponse>;
    getInstallmentPayments(id: number, options?: RequestOptions): Promise<InstallmentPaymentsResponse>;
}
