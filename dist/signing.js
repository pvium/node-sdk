"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PVIUM_SIGNATURE_DOMAIN = void 0;
exports.createSignerFromPrivateKey = createSignerFromPrivateKey;
exports.hashAbiEncodedPayload = hashAbiEncodedPayload;
exports.signMessageHash = signMessageHash;
exports.hashCreateProjectRequest = hashCreateProjectRequest;
exports.signCreateProjectRequest = signCreateProjectRequest;
exports.hashCreateProjectAttestation = hashCreateProjectAttestation;
exports.signCreateProjectAttestation = signCreateProjectAttestation;
exports.hashCreateClaimRequest = hashCreateClaimRequest;
exports.signCreateClaimRequest = signCreateClaimRequest;
exports.hashFinalizeClaimRequest = hashFinalizeClaimRequest;
exports.signFinalizeClaimRequest = signFinalizeClaimRequest;
exports.hashRelayedCallRequest = hashRelayedCallRequest;
exports.signRelayedCallRequest = signRelayedCallRequest;
exports.hashDisputeRequest = hashDisputeRequest;
exports.signDisputeRequest = signDisputeRequest;
exports.hashResolveDisputeRequest = hashResolveDisputeRequest;
exports.signResolveDisputeRequest = signResolveDisputeRequest;
exports.signatureDomainFromText = signatureDomainFromText;
const ethers_1 = require("ethers");
const ABI_CODER = ethers_1.AbiCoder.defaultAbiCoder();
exports.PVIUM_SIGNATURE_DOMAIN = (0, ethers_1.id)("PVIUM_SIGNATURE_MESSAGE");
function createSignerFromPrivateKey(privateKey) {
    return new ethers_1.Wallet(privateKey);
}
function resolveSigner(signerOrPrivateKey) {
    if (typeof signerOrPrivateKey === "string") {
        return createSignerFromPrivateKey(signerOrPrivateKey);
    }
    return signerOrPrivateKey;
}
function hashAbiEncodedPayload(types, values) {
    return (0, ethers_1.keccak256)(ABI_CODER.encode(types, values));
}
async function signMessageHash(messageHash, signerOrPrivateKey) {
    const signer = resolveSigner(signerOrPrivateKey);
    return signer.signMessage((0, ethers_1.getBytes)(messageHash));
}
function hashCreateProjectRequest(payload, options) {
    const signatureDomain = options.signatureDomain ?? exports.PVIUM_SIGNATURE_DOMAIN;
    return hashAbiEncodedPayload([
        "bytes32",
        "string",
        "string",
        "string",
        "address",
        "address",
        "address",
        "address",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
    ], [
        signatureDomain,
        payload.app,
        payload.projectId,
        payload.metadata,
        payload.tokenAddress,
        payload.refundAddress,
        payload.appFeeAddress,
        payload.appAdminAddress,
        payload.appFeeBps,
        payload.disputeWindowSeconds,
        payload.lockDuration,
        payload.minimumBalancePerVendor,
        options.pviumFeeBps,
        options.chainId,
    ]);
}
async function signCreateProjectRequest(payload, signerOrPrivateKey, options) {
    const messageHash = hashCreateProjectRequest(payload, options);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashCreateProjectAttestation(appSignature, chainId, signatureDomain = exports.PVIUM_SIGNATURE_DOMAIN) {
    return hashAbiEncodedPayload(["bytes32", "bytes", "uint256"], [signatureDomain, appSignature, chainId]);
}
async function signCreateProjectAttestation(appSignature, signerOrPrivateKey, chainId, signatureDomain = exports.PVIUM_SIGNATURE_DOMAIN) {
    const messageHash = hashCreateProjectAttestation(appSignature, chainId, signatureDomain);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashCreateClaimRequest(payload) {
    return hashAbiEncodedPayload([
        "string",
        "string",
        "bytes32",
        "address",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
    ], [
        payload.app,
        payload.projectId,
        payload.claimId,
        payload.receiver,
        payload.amount,
        payload.claimableAfter,
        payload.claimDeadline,
        payload.nonce,
    ]);
}
async function signCreateClaimRequest(payload, signerOrPrivateKey) {
    const messageHash = hashCreateClaimRequest(payload);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashFinalizeClaimRequest(claims, chainId) {
    let dataPacked = "0x";
    for (const claim of claims) {
        dataPacked = (0, ethers_1.concat)([
            dataPacked,
            (0, ethers_1.toUtf8Bytes)(claim.app),
            (0, ethers_1.toUtf8Bytes)(claim.projectId),
            claim.claimId,
        ]);
    }
    return (0, ethers_1.keccak256)((0, ethers_1.concat)([dataPacked, (0, ethers_1.toBeHex)(chainId, 32)]));
}
async function signFinalizeClaimRequest(claims, signerOrPrivateKey, chainId) {
    const messageHash = hashFinalizeClaimRequest(claims, chainId);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashRelayedCallRequest(payload) {
    return hashAbiEncodedPayload(["string", "string", "bytes", "uint256", "uint256"], [
        payload.appId,
        payload.projectId,
        payload.payload,
        payload.nonce,
        payload.chainId,
    ]);
}
async function signRelayedCallRequest(payload, signerOrPrivateKey) {
    const messageHash = hashRelayedCallRequest(payload);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashDisputeRequest(claimId, chainId) {
    return hashAbiEncodedPayload(["bytes32", "uint256"], [claimId, chainId]);
}
async function signDisputeRequest(claimId, signerOrPrivateKey, chainId) {
    const messageHash = hashDisputeRequest(claimId, chainId);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function hashResolveDisputeRequest(payload) {
    return hashAbiEncodedPayload(["bytes32", "bool", "uint256"], [payload.claimId, payload.approved, payload.chainId]);
}
async function signResolveDisputeRequest(payload, signerOrPrivateKey) {
    const messageHash = hashResolveDisputeRequest(payload);
    return signMessageHash(messageHash, signerOrPrivateKey);
}
function signatureDomainFromText(message) {
    return (0, ethers_1.id)(message);
}
