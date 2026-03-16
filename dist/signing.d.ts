import { Wallet, type Signer } from "ethers";
export type HexString = `0x${string}`;
export type Numeric = number | bigint;
export type MessageSigner = Pick<Signer, "signMessage">;
export type SignerInput = string | MessageSigner;
export declare const PVIUM_SIGNATURE_DOMAIN: HexString;
export interface CreateProjectRequestPayload {
    app: string;
    projectId: string;
    metadata: string;
    tokenAddress: string;
    refundAddress: string;
    appFeeAddress: string;
    appAdminAddress: string;
    appFeeBps: Numeric;
    disputeWindowSeconds: Numeric;
    lockDuration: Numeric;
    minimumBalancePerVendor: Numeric;
}
export interface CreateProjectSignatureOptions {
    pviumFeeBps: Numeric;
    chainId: Numeric;
    signatureDomain?: HexString;
}
export interface CreateClaimRequestPayload {
    app: string;
    projectId: string;
    claimId: string;
    receiver: string;
    amount: Numeric;
    claimableAfter: Numeric;
    claimDeadline: Numeric;
    nonce: Numeric;
}
export interface FinalizeClaimRequestPayload {
    app: string;
    projectId: string;
    claimId: string;
}
export interface RelayedCallRequestPayload {
    appId: string;
    projectId: string;
    payload: HexString;
    nonce: Numeric;
    chainId: Numeric;
}
export interface ResolveDisputeRequestPayload {
    claimId: string;
    approved: boolean;
    chainId: Numeric;
}
export declare function createSignerFromPrivateKey(privateKey: string): Wallet;
export declare function hashAbiEncodedPayload(types: readonly string[], values: readonly unknown[]): HexString;
export declare function signMessageHash(messageHash: string, signerOrPrivateKey: SignerInput): Promise<string>;
export declare function hashCreateProjectRequest(payload: CreateProjectRequestPayload, options: CreateProjectSignatureOptions): HexString;
export declare function signCreateProjectRequest(payload: CreateProjectRequestPayload, signerOrPrivateKey: SignerInput, options: CreateProjectSignatureOptions): Promise<string>;
export declare function hashCreateProjectAttestation(appSignature: string, chainId: Numeric, signatureDomain?: HexString): HexString;
export declare function signCreateProjectAttestation(appSignature: string, signerOrPrivateKey: SignerInput, chainId: Numeric, signatureDomain?: HexString): Promise<string>;
export declare function hashCreateClaimRequest(payload: CreateClaimRequestPayload): HexString;
export declare function signCreateClaimRequest(payload: CreateClaimRequestPayload, signerOrPrivateKey: SignerInput): Promise<string>;
export declare function hashFinalizeClaimRequest(claims: readonly FinalizeClaimRequestPayload[], chainId: Numeric): HexString;
export declare function signFinalizeClaimRequest(claims: readonly FinalizeClaimRequestPayload[], signerOrPrivateKey: SignerInput, chainId: Numeric): Promise<string>;
export declare function hashRelayedCallRequest(payload: RelayedCallRequestPayload): HexString;
export declare function signRelayedCallRequest(payload: RelayedCallRequestPayload, signerOrPrivateKey: SignerInput): Promise<string>;
export declare function hashDisputeRequest(claimId: string, chainId: Numeric): HexString;
export declare function signDisputeRequest(claimId: string, signerOrPrivateKey: SignerInput, chainId: Numeric): Promise<string>;
export declare function hashResolveDisputeRequest(payload: ResolveDisputeRequestPayload): HexString;
export declare function signResolveDisputeRequest(payload: ResolveDisputeRequestPayload, signerOrPrivateKey: SignerInput): Promise<string>;
export declare function signatureDomainFromText(message: string): HexString;
