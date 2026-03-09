export interface RequestOptions {
    headers?: Record<string, string>;
    signal?: AbortSignal;
}
export interface CreateContractRequest {
    name: string;
    description: string;
    amount: number;
    dueDate: string;
    paymentChannels: {
        chain: string;
        currency: string;
    }[];
    redirectUri: string;
}
export interface ApiMeta {
    statusCode: number;
    success: boolean;
    message?: string;
    developerMessage?: string;
}
export interface PaginationMeta {
    totalCount: number;
    perPage: number;
    current: number;
    currentPage?: string;
    next?: number;
    nextPage?: string;
}
export interface Quantity {
    amount: string;
    unit: string;
}
export interface InvoiceItem {
    name: string;
    price: number;
    quantity: Quantity;
    [key: string]: unknown;
}
export interface InstallmentPlanItem {
    amount: number;
    dueDate: string;
    [key: string]: unknown;
}
export interface ContractListItem {
    id: number;
    code: string;
    name: string;
    documentType?: string;
    contractType?: string;
    currencySymbol?: string;
    actualAmount?: number;
    totalPaid?: number;
    totalUnpaid?: number;
    plan?: InstallmentPlanItem[];
    items?: InvoiceItem[];
    [key: string]: unknown;
}
export interface CreateContractData extends ContractListItem {
    url?: string;
}
export interface CreateContractResponse {
    meta: ApiMeta;
    data: CreateContractData;
}
export interface ListContractsResponse {
    meta: ApiMeta & {
        pagination?: PaginationMeta;
    };
    data: ContractListItem[];
}
export interface InvoiceStatusInstallment {
    id: number;
    amount: number;
    dueDate: string;
    totalPaid: number;
    totalUnpaid: number;
    payments: unknown[];
    [key: string]: unknown;
}
export interface InvoiceStatusData {
    contractId: number;
    contractCode: string;
    contractName: string;
    currencySymbol: string;
    totalAmount: number;
    totalPaid: number;
    totalUnpaid: number;
    installments: InvoiceStatusInstallment[];
    [key: string]: unknown;
}
export interface InvoiceStatusResponse {
    meta: ApiMeta;
    data: InvoiceStatusData;
}
export interface InstallmentPayment {
    id: number;
    installment: number;
    amount: number;
    status: string;
    paymentMethod?: string;
    transactionHash?: string;
    paymentDate?: string;
    [key: string]: unknown;
}
export interface InstallmentPaymentsResponse {
    meta: ApiMeta;
    data: InstallmentPayment[];
}
