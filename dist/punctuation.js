"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.punctuation = void 0;
exports.punctuation = (messages) => messages.map(stripSurroundingMarks).map(fullStopMessage);
const stripSurroundingMarks = (message) => {
    return Object.assign(Object.assign({}, message), { message: deleteSurroundingMarks(message.message) });
};
const deleteSurroundingMarks = (s) => {
    const match = s.match(/^"(.*)"$/);
    if (match != null)
        return match[1];
    else
        return s;
};
const fullStopMessage = (message) => {
    return Object.assign(Object.assign({}, message), { message: appendFullStop(message.message) });
};
const appendFullStop = (s) => {
    if (s.charAt(s.length - 1).match(/[A-za-z]/) != null) {
        return s + '.';
    }
    else
        return s;
};
