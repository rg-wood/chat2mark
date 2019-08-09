"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const appendFullStop = (s) => {
    if (s.charAt(s.length - 1).match(/[A-za-z]/) != null) {
        return s + '.';
    }
    else
        return s;
};
const fullStopEvent = (event) => {
    switch (event.kind) {
        case 'action': return new messages_1.Action(appendFullStop(event.message));
        case 'speech': return new messages_1.Speech(appendFullStop(event.message));
        case 'partial': return new messages_1.PartialAction(event.action, appendFullStop(event.message));
    }
};
const fullStopMessage = (message) => {
    switch (message.kind) {
        case 'player': return new messages_1.PlayerMessage(message.actor, message.events.map(fullStopEvent));
        default: return message;
    }
};
exports.stop = (messages) => messages.map(fullStopMessage);
