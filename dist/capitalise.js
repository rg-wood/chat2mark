"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitaliseMessages = void 0;
const capitalise = (s) => s.charAt(0).toUpperCase().concat(s.slice(1));
const lowercase = (s) => s.charAt(0).toLowerCase().concat(s.slice(1));
const capitaliseMessage = (message) => {
    switch (message.type) {
        case 'does': return Object.assign(Object.assign({}, message), { message: lowercase(message.message) });
        case 'says': return Object.assign(Object.assign({}, message), { message: capitalise(message.message) });
        case 'rolls': return Object.assign(Object.assign({}, message), { message: capitalise(message.message) });
    }
};
exports.capitaliseMessages = (messages) => messages.map(capitaliseMessage);
