"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const group_adjacent_1 = require("./group-adjacent");
function flatten(arrays) {
    return [].concat.apply([], arrays);
}
const flattenOrphans = (messages) => {
    const baseMessage = messages[0];
    if (messages.length === 1)
        return baseMessage;
    else if (baseMessage.kind === 'player') {
        const events = messages
            .filter((m) => m.kind === 'player')
            .map(m => m.events);
        return new messages_1.PlayerMessage(baseMessage.actor, flatten(events));
    }
    else
        return baseMessage;
};
const isOrphaned = (pre, cur) => pre.kind === 'player' && cur.kind === 'player' && cur.actor.trim() === '';
exports.orphan = (messages) => group_adjacent_1.groupAdjacent(messages, isOrphaned).map(flattenOrphans);
