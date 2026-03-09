"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PviumSdk = void 0;
exports.createPviumSdk = createPviumSdk;
const endpoints_1 = require("./endpoints");
const client_1 = require("./client");
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
