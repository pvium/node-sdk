import { PviumEndpoints } from "./endpoints";
import { PviumHttpClient, PviumSdkConfig } from "./client";
export type { PviumSdkConfig } from "./client";
export type {
  ContractListItem,
  CreateContractRequest,
  InstallmentPayment,
  InvoiceStatusResponse,
} from "./types";
export {
  PVIUM_SIGNATURE_DOMAIN,
  createSignerFromPrivateKey,
  hashAbiEncodedPayload,
  hashCreateClaimRequest,
  hashCreateProjectAttestation,
  hashCreateProjectRequest,
  hashDisputeRequest,
  hashFinalizeClaimRequest,
  hashRelayedCallRequest,
  hashResolveDisputeRequest,
  signCreateClaimRequest,
  signCreateProjectAttestation,
  signCreateProjectRequest,
  signDisputeRequest,
  signFinalizeClaimRequest,
  signMessageHash,
  signRelayedCallRequest,
  signResolveDisputeRequest,
  signatureDomainFromText,
} from "./signing";
export type {
  CreateClaimRequestPayload,
  CreateProjectRequestPayload,
  CreateProjectSignatureOptions,
  FinalizeClaimRequestPayload,
  HexString,
  MessageSigner,
  Numeric,
  RelayedCallRequestPayload,
  ResolveDisputeRequestPayload,
  SignerInput,
} from "./signing";

export class PviumSdk {
  readonly http: PviumHttpClient;
  readonly endpoints: PviumEndpoints;

  constructor(config: PviumSdkConfig) {
    this.http = new PviumHttpClient(config);
    this.endpoints = new PviumEndpoints(this.http);
  }
}

export function createPviumSdk(config: PviumSdkConfig): PviumSdk {
  return new PviumSdk(config);
}
