"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const emptyMessage = (event) => (event.message !== undefined && event.message.trim() !== '');
exports.empty = (messages) => {
    const filtered = messages.map(message => {
        switch (message.kind) {
            case "player": return new messages_1.PlayerMessage(message.actor, message.events.filter(emptyMessage));
            default: return message;
        }
    });
    return filtered.filter(message => {
        switch (message.kind) {
            case "player": return message.events.length !== 0;
            default: return true;
        }
    });
};
