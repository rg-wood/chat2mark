"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = void 0;
const messages_1 = require("./messages");
const group_adjacent_1 = require("./group-adjacent");
const function_1 = require("fp-ts/lib/function");
const flattenPlayerMessage = (messages) => {
    const baseMessage = messages[0];
    if (messages.length === 1)
        return baseMessage;
    else if (baseMessage.kind === 'player') {
        const events = messages
            .filter((m) => m.kind === 'player')
            .map(m => m.events[0]);
        return new messages_1.PlayerMessage(baseMessage.actor, events);
    }
    else
        return baseMessage;
};
const flattenGmMessage = (messages) => {
    const baseMessage = messages[0];
    if (messages.length === 1)
        return baseMessage;
    else if (baseMessage.kind === 'gm') {
        const events = messages
            .filter((m) => m.kind === 'gm')
            .map(m => m.events[0]);
        return new messages_1.GameMasterMessage(events);
    }
    else
        return baseMessage;
};
const flattenRolls = (messages) => {
    const baseMessage = messages[0];
    if (messages.length === 1)
        return baseMessage;
    else if (baseMessage.kind === 'rolls') {
        const rolls = messages
            .filter((m) => m.kind === 'rolls')
            .map(m => m.rolls[0]);
        return new messages_1.Rolls(rolls);
    }
    else
        return baseMessage;
};
const consecutiveSameActors = (pre, cur) => pre.kind === 'player' && cur.kind === 'player' && pre.actor === cur.actor;
const collectPlayerMessages = (messages) => group_adjacent_1.groupAdjacent(messages, consecutiveSameActors).map(flattenPlayerMessage);
const consecutiveGmMessages = (pre, cur) => pre.kind === 'gm' && cur.kind === 'gm';
const collectGmMessages = (messages) => group_adjacent_1.groupAdjacent(messages, consecutiveGmMessages).map(flattenGmMessage);
const consecutiveRolls = (pre, cur) => pre.kind === 'rolls' && cur.kind === 'rolls';
const collectRolls = (messages) => group_adjacent_1.groupAdjacent(messages, consecutiveRolls).map(flattenRolls);
exports.collect = function_1.flow(collectPlayerMessages, collectGmMessages, collectRolls);
