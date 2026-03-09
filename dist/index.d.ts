import { PviumEndpoints } from "./endpoints";
import { PviumHttpClient, PviumSdkConfig } from "./client";
export type { PviumSdkConfig } from "./client";
export type { ContractListItem, CreateContractRequest, InstallmentPayment, InvoiceStatusResponse, } from "./types";
export declare class PviumSdk {
    readonly http: PviumHttpClient;
    readonly endpoints: PviumEndpoints;
    constructor(config: PviumSdkConfig);
}
export declare function createPviumSdk(config: PviumSdkConfig): PviumSdk;
