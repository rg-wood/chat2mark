"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(actor, type, message, timestamp) {
        this.actor = actor;
        this.type = type;
        this.message = message;
        this.timestamp = timestamp;
    }
}
exports.Message = Message;
