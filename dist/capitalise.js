"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const capitalise = (s) => s.charAt(0).toUpperCase().concat(s.slice(1));
const lowercase = (s) => s.charAt(0).toLowerCase().concat(s.slice(1));
const capitaliseEvent = (event) => {
    switch (event.kind) {
        case 'action': return event;
        case 'speech': return new messages_1.Speech(capitalise(event.message));
        case 'partial': return new messages_1.PartialAction(lowercase(event.action), capitalise(event.message));
    }
};
const capitaliseMessage = (message) => {
    switch (message.kind) {
        case 'player': return new messages_1.PlayerMessage(message.actor, message.events.map(capitaliseEvent));
        default: return message;
    }
};
exports.capitaliseMessages = (messages) => messages.map(capitaliseMessage);
