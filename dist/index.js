"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PviumSdk = exports.signatureDomainFromText = exports.signResolveDisputeRequest = exports.signRelayedCallRequest = exports.signMessageHash = exports.signFinalizeClaimRequest = exports.signDisputeRequest = exports.signCreateProjectRequest = exports.signCreateProjectAttestation = exports.signCreateClaimRequest = exports.hashResolveDisputeRequest = exports.hashRelayedCallRequest = exports.hashFinalizeClaimRequest = exports.hashDisputeRequest = exports.hashCreateProjectRequest = exports.hashCreateProjectAttestation = exports.hashCreateClaimRequest = exports.hashAbiEncodedPayload = exports.createSignerFromPrivateKey = exports.PVIUM_SIGNATURE_DOMAIN = void 0;
exports.createPviumSdk = createPviumSdk;
const endpoints_1 = require("./endpoints");
const client_1 = require("./client");
var signing_1 = require("./signing");
Object.defineProperty(exports, "PVIUM_SIGNATURE_DOMAIN", { enumerable: true, get: function () { return signing_1.PVIUM_SIGNATURE_DOMAIN; } });
Object.defineProperty(exports, "createSignerFromPrivateKey", { enumerable: true, get: function () { return signing_1.createSignerFromPrivateKey; } });
Object.defineProperty(exports, "hashAbiEncodedPayload", { enumerable: true, get: function () { return signing_1.hashAbiEncodedPayload; } });
Object.defineProperty(exports, "hashCreateClaimRequest", { enumerable: true, get: function () { return signing_1.hashCreateClaimRequest; } });
Object.defineProperty(exports, "hashCreateProjectAttestation", { enumerable: true, get: function () { return signing_1.hashCreateProjectAttestation; } });
Object.defineProperty(exports, "hashCreateProjectRequest", { enumerable: true, get: function () { return signing_1.hashCreateProjectRequest; } });
Object.defineProperty(exports, "hashDisputeRequest", { enumerable: true, get: function () { return signing_1.hashDisputeRequest; } });
Object.defineProperty(exports, "hashFinalizeClaimRequest", { enumerable: true, get: function () { return signing_1.hashFinalizeClaimRequest; } });
Object.defineProperty(exports, "hashRelayedCallRequest", { enumerable: true, get: function () { return signing_1.hashRelayedCallRequest; } });
Object.defineProperty(exports, "hashResolveDisputeRequest", { enumerable: true, get: function () { return signing_1.hashResolveDisputeRequest; } });
Object.defineProperty(exports, "signCreateClaimRequest", { enumerable: true, get: function () { return signing_1.signCreateClaimRequest; } });
Object.defineProperty(exports, "signCreateProjectAttestation", { enumerable: true, get: function () { return signing_1.signCreateProjectAttestation; } });
Object.defineProperty(exports, "signCreateProjectRequest", { enumerable: true, get: function () { return signing_1.signCreateProjectRequest; } });
Object.defineProperty(exports, "signDisputeRequest", { enumerable: true, get: function () { return signing_1.signDisputeRequest; } });
Object.defineProperty(exports, "signFinalizeClaimRequest", { enumerable: true, get: function () { return signing_1.signFinalizeClaimRequest; } });
Object.defineProperty(exports, "signMessageHash", { enumerable: true, get: function () { return signing_1.signMessageHash; } });
Object.defineProperty(exports, "signRelayedCallRequest", { enumerable: true, get: function () { return signing_1.signRelayedCallRequest; } });
Object.defineProperty(exports, "signResolveDisputeRequest", { enumerable: true, get: function () { return signing_1.signResolveDisputeRequest; } });
Object.defineProperty(exports, "signatureDomainFromText", { enumerable: true, get: function () { return signing_1.signatureDomainFromText; } });
class PviumSdk {
    constructor(config) {
        this.http = new client_1.PviumHttpClient(config);
        this.endpoints = new endpoints_1.PviumEndpoints(this.http);
    }
}
exports.PviumSdk = PviumSdk;
function createPviumSdk(config) {
    return new PviumSdk(config);
}
