"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChat = void 0;
const messages_1 = require("./messages");
const cheerio = require("cheerio");
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
        return new messages_1.Message(message('.by').text().replace(/:$/, ''), 'rolls', parseRollResult(message));
    }
    else {
        return new messages_1.Message(message('.by').text().replace(/:$/, ''), 'rolls', `${capitalize(check)}: ${parseRollResult(message)}`);
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
        return new messages_1.Message(actor, 'says', speech);
    else
        return new messages_1.Message('GM', 'says', speech);
};
const nonCapitalisedWord = /^[a-z]/;
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
    return new messages_1.Message(name.join(' '), 'does', action.join(' '));
};
const parseMessage = (element) => {
    const message = cheerio.load(element);
    if (element.attribs.class.includes('private')) {
        return new messages_1.Message('GM', 'says', '');
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
