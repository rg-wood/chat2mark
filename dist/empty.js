"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = void 0;
const emptyMessage = (event) => (event.message !== undefined && event.message.trim() !== '');
const emptyRoll = (roll) => (roll.actor !== undefined && roll.message !== undefined && roll.actor.trim() !== '' && roll.message.trim() !== '');
exports.empty = (messages) => messages
    .filter((message) => {
    switch (message.type) {
        case 'rolls': return emptyRoll(message);
        default: return emptyMessage(message);
    }
});
