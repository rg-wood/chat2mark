"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCsv = void 0;
exports.toCsv = (messages) => {
    const header = 'kind,subkind,actor,message,action,result,check\n';
    return header +
        messages
            .map(renderMessage)
            .flat()
            .join('\n');
};
const renderMessage = (message) => {
    switch (message.kind) {
        case 'player': return [`${message.kind},,"${message.actor}"`].concat(message.events.map(renderEvent));
        case 'private': return [message.kind];
        case 'gm': return [message.kind].concat(message.events.map(renderEvent));
        case 'rolls': return [message.kind].concat(message.rolls.map(renderRoll));
    }
};
const renderEvent = (event) => {
    switch (event.kind) {
        case 'speech': return `,${event.kind},,"${event.message}"`;
        case 'action': return `,${event.kind},,,"${event.message}"`;
        case 'partial': return `,${event.kind},,"${event.message}","${event.action}"`;
    }
};
const renderRoll = (roll) => {
    if (roll.check !== undefined) {
        return `,roll,"${roll.actor}",,,${roll.result},"${roll.check}"`;
    }
    else {
        return `,roll,"${roll.actor}",,,${roll.result}`;
    }
};
