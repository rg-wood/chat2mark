"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const emptyMessage = (event) => (event.message !== undefined && event.message.trim() !== '');
const emptyRoll = (roll) => (roll.roller !== undefined && roll.check !== undefined && roll.roller.trim() != '' && roll.check.trim() !== '');
exports.empty = (messages) => {
    const filtered = messages.map(message => {
        switch (message.kind) {
            case "player": return new messages_1.PlayerMessage(message.actor, message.events.filter(emptyMessage));
            case "gm": return new messages_1.GameMasterMessage(message.events.filter(emptyMessage));
            case "rolls": return new messages_1.Rolls(message.rolls.filter(emptyRoll));
            default: return message;
        }
    });
    return filtered.filter(message => {
        switch (message.kind) {
            case "player":
            case "gm": return message.events.length !== 0;
            case "rolls": return message.rolls.length !== 0;
            default: return true;
        }
    });
};
