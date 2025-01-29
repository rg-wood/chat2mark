"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(actor, type, chat, message, timestamp) {
        this.actor = actor;
        this.type = type;
        this.chat = chat;
        this.message = message;
        this.timestamp = timestamp;
    }
}
exports.Message = Message;
