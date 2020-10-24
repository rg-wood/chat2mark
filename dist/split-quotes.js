"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitQuotes = void 0;
const messages_1 = require("./messages");
function flatten(arrays) {
    return [].concat(...arrays);
}
const quotes = /^(.*)("|'')(.*)("|'')(.*)$/;
const splitQuotesForAction = (action) => {
    const match = action.message.match(quotes);
    if (match != null) {
        return [
            new messages_1.Action(match[1].trim()),
            new messages_1.Speech(match[3].trim())
        ];
    }
    else
        return [action];
};
const splitQuotesForEvent = (event) => {
    switch (event.kind) {
        case 'action': return splitQuotesForAction(event);
        default: return [event];
    }
};
const splitQuotesForPlayerMessage = (message) => new messages_1.PlayerMessage(message.actor, flatten(message.events.map(splitQuotesForEvent)));
exports.splitQuotes = (messages) => messages.map((message) => {
    switch (message.kind) {
        case 'player': return splitQuotesForPlayerMessage(message);
        default: return message;
    }
});
