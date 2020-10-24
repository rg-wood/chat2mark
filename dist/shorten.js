"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorten = void 0;
const messages_1 = require("./messages");
const shortenedNames = {
    'Quinn Wheatsteal': 'Quinn',
    'Sergeant Agata': 'Agata',
    'Corporal Loth': 'Loth',
    'Ba\' Raknul': 'Ba\'Raknul',
    'Ric (GM)': 'GM'
};
const shortenName = (message) => new messages_1.PlayerMessage((shortenedNames[message.actor] != null && shortenedNames[message.actor]) || message.actor, message.events);
const shortenNames = (message) => {
    switch (message.kind) {
        case 'player': return shortenName(message);
        default: return message;
    }
};
exports.shorten = (messages) => messages.map(shortenNames);
