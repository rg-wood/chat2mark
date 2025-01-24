"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = exports.toCsv = void 0;
const messages_1 = require("./messages");
const parse = require("csv-parse/lib/es5/sync");
const group_adjacent_1 = require("./group-adjacent");
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
exports.parseCsv = (csv) => {
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true
    });
    console.log(group_adjacent_1.groupAdjacent(records, messageRecords));
    return group_adjacent_1.groupAdjacent(records, messageRecords)
        .map(parseMessage);
};
const messageRecords = (pre, cur) => (pre.kind !== '' && cur.kind === '') || (pre.kind === '' && cur.kind === '');
const parseMessage = (group) => {
    const message = group[0];
    switch (message.kind) {
        case 'player': return parsePlayerMessage(group);
        case 'rolls': return parseRolls(group);
        case 'gm': return parseGameMasterMessage(group);
        case 'private': return new messages_1.Private();
        default: throw new Error(`unknown message type=${message.kind}`);
    }
};
const parsePlayerMessage = (group) => {
    const [message, ...events] = group;
    if (message.actor !== undefined)
        return new PlayerMessage(message.actor, events.map(parseEvents));
    else
        throw new Error('corrupt message');
};
const parseEvents = (event) => {
    switch (event.subkind) {
        case 'speech': return parseSpeech(event);
        case 'action': return parseAction(event);
        case 'partial': return parsePartial(event);
        default: throw new Error(`unknown event type=${event.subkind}`);
    }
};
const parseSpeech = (event) => {
    if (event.message !== undefined)
        return new messages_1.Speech(event.message);
    else
        throw new Error('corrupt message');
};
const parseAction = (event) => {
    if (event.action !== undefined)
        return new messages_1.Action(event.action);
    else
        throw new Error('corrupt message');
};
const parsePartial = (event) => {
    if (event.action !== undefined &&
        event.message !== undefined)
        return new PartialAction(event.action, event.message);
    else
        throw new Error('corrupt message');
};
const parseGameMasterMessage = (group) => {
    const events = group.slice(1);
    return new messages_1.GameMasterMessage(events.map(parseSpeech));
};
const parseRolls = (group) => {
    const events = group.slice(1);
    return new Rolls(events.map(parseRoll));
};
const parseRoll = (event) => {
    if (event.actor !== undefined &&
        event.result !== undefined)
        return new messages_1.Roll(event.actor, parseInt(event.result), event.check);
    else
        throw new Error('corrupt message');
};
