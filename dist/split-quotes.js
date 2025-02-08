"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitQuotes = void 0;
const flatten_1 = require("./flatten");
const quotes = /^(.*)("|'')(.*)("|'')(.*)$/;
const splitQuotesForAction = (action) => {
    const match = action.message.match(quotes);
    if (match != null) {
        const partialAction = Object.assign(Object.assign({}, action), { message: match[1].trim() });
        const speech = Object.assign(Object.assign({}, action), { type: 'says', message: match[3].trim() });
        return [partialAction, speech];
    }
    else
        return [action];
};
exports.splitQuotes = (messages) => flatten_1.flatten(messages.map((message) => {
    switch (message.type) {
        case 'does': return splitQuotesForAction(message);
        default: return [message];
    }
}));
