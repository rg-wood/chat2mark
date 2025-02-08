"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiline = void 0;
const messages_1 = require("./messages");
function flatten(arrays) {
    return [].concat(...arrays);
}
function splitLine(message) {
    return message
        .message
        .split(/\r?\n|\r|\n/g)
        .filter(line => line !== '')
        .map(line => new messages_1.Message(message.actor, message.type, message.chat, line, message.timestamp));
}
exports.multiline = (messages) => flatten(messages.map(splitLine));
