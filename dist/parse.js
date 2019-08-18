"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./messages");
const cheerio = require("cheerio");
const capitalize = (s) => s.charAt(0).toUpperCase().concat(s.slice(1).toLowerCase());
const parseRoll = (message) => new messages_1.Rolls([
    new messages_1.Roll(message('.by').text().replace(/\:$/, ''), parseInt(message('.inlinerollresult').slice(0, 1).text()), capitalize(message('.sheet-label').text().trim().split(' ')[0]))
]);
const parseSpeech = (message, element) => {
    const actor = message('.by').text().replace(/\:$/, '');
    const speech = element
        .children
        .filter((c) => c.type === 'text')
        .map((c) => c.data)
        .join(' ')
        .trim();
    if (actor && !actor.includes('GM'))
        return new messages_1.PlayerMessage(actor, [new messages_1.Speech(speech)]);
    else
        return new messages_1.GameMasterMessage([new messages_1.Speech(speech)]);
};
const nonCapitalisedWord = /^[a-z]/;
const firstNonCapitalisedWord = (word) => word.match(nonCapitalisedWord) !== null;
const indexOfName = (words) => {
    if (words[0] === "The") {
        return 2;
    }
    else {
        return words.findIndex(firstNonCapitalisedWord);
    }
};
const partialAction = /^([^,]*),? ("|')(.*)\2$/;
const parseAction = (action) => {
    const match = action.replace(/''/g, `"`).match(partialAction);
    if (match != null) {
        return new messages_1.PartialAction(match[1], match[3]);
    }
    else {
        return new messages_1.Action(action);
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
    return new messages_1.PlayerMessage(name.join(' '), [parseAction(action.join(' '))]);
};
const parseMessage = (element) => {
    const message = cheerio.load(element);
    if (element.attribs.class.includes('general') && message('.inlinerollresult').length > 0) {
        return parseRoll(message);
    }
    else if (element.attribs.class.includes('general')) {
        return parseSpeech(message, element);
    }
    else if (element.attribs.class.includes('emote')) {
        return parsePlayerAction(message, element);
    }
    else if (element.attribs.class.includes('private')) {
        return new messages_1.Private();
    }
    else {
        throw new Error(`Unrecognised message: ${message.html()}`);
    }
};
exports.parseChat = (html) => {
    const $ = cheerio.load(html);
    return $('div.message').toArray().map(parseMessage);
};
