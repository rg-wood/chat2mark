"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOcc = exports.parseChat = void 0;
const messages_1 = require("./messages");
const cheerio = require("cheerio");
const moment = require("moment");
const csv_1 = require("./csv");
const fs = require("fs");
let lastTimeStamp;
function readTimestamp(message) {
    const text = message('.tstamp').text().trim();
    if (text !== '') {
        const timestamp = moment(text, 'MMMM DD, YYYY hh:mmaa');
        lastTimeStamp = timestamp.toDate();
        return lastTimeStamp;
    }
    else {
        return lastTimeStamp;
    }
}
const capitalize = (s) => s.charAt(0).toUpperCase().concat(s.slice(1).toLowerCase());
const parseRollResult = (message) => {
    if (message('.inlinerollresult').length > 0) {
        return message('.inlinerollresult').slice(0, 1).text();
    }
    else {
        return message('.rolled').slice(0, 1).text();
    }
};
const parseRoll = (message) => {
    const check = message('.sheet-label').text().trim().split(' ')[0];
    if (check === '') {
        return new messages_1.Message(message('.by').text().replace(/:$/, ''), 'rolls', 'ooc', parseRollResult(message), readTimestamp(message));
    }
    else {
        return new messages_1.Message(message('.by').text().replace(/:$/, ''), 'rolls', 'ooc', `${capitalize(check)}: ${parseRollResult(message)}`, readTimestamp(message));
    }
};
const parseSpeech = (message, element) => {
    const actor = message('.by').text().replace(/:$/, '');
    const speech = element
        .children
        .filter((c) => c.type === 'text')
        .map((c) => c.data)
        .join(' ')
        .trim();
    if ((actor && !actor.includes('GM')) || (!element.attribs.class.includes('you')))
        return new messages_1.Message(actor, 'says', 'ic', speech, readTimestamp(message));
    else
        return new messages_1.Message('GM', 'says', 'ic', speech, readTimestamp(message));
};
const nonCapitalisedWord = /^[a-z0-9]/;
const firstNonCapitalisedWord = (word) => word.match(nonCapitalisedWord) !== null;
const indexOfName = (words) => {
    if (words[0] === 'The') {
        return 2;
    }
    else {
        return words.findIndex(firstNonCapitalisedWord);
    }
};
const parsePlayerAction = (message, element) => {
    const words = element
        .children
        .filter((c) => c.type === 'text')
        .map((c) => c.data)
        .join(' ')
        .trim()
        .split(' ');
    const i = indexOfName(words);
    const name = words.slice(0, i);
    const action = words.slice(i, words.length);
    return new messages_1.Message(name.join(' '), 'does', 'ic', action.join(' '), readTimestamp(message));
};
const parseMessage = (element) => {
    const message = cheerio.load(element);
    if (element.attribs.class.includes('private')) {
        return new messages_1.Message('GM', 'says', 'ic', '', new Date(0));
    }
    else if (element.attribs.class.includes('general') && message('.inlinerollresult').length > 0) {
        return parseRoll(message);
    }
    else if (element.attribs.class.includes('rollresult')) {
        return parseRoll(message);
    }
    else if (element.attribs.class.includes('general')) {
        return parseSpeech(message, element);
    }
    else if (element.attribs.class.includes('emote')) {
        return parsePlayerAction(message, element);
    }
    else {
        throw new Error(`Unrecognised message for classes=[${element.attribs.class}]: ${message.html()}`);
    }
};
exports.parseChat = (html) => {
    const $ = cheerio.load(html);
    return $('div.message').toArray().map(parseMessage);
};
exports.parseOcc = (file) => {
    const csv = fs.readFileSync(file, { encoding: 'utf8' });
    const chat = csv_1.fromOocCsv(csv);
    return (messages) => {
        return messages.concat(chat);
    };
};
