"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const parse_1 = require("./parse");
const shorten_1 = require("./shorten");
const split_quotes_1 = require("./split-quotes");
const capitalise_1 = require("./capitalise");
const punctuation_1 = require("./punctuation");
const empty_1 = require("./empty");
const csv_1 = require("./csv");
const sort_1 = require("./sort");
const function_1 = require("fp-ts/lib/function");
function convert(ooc) {
    return function_1.flow(parse_1.parseChat, parse_1.parseOcc(ooc), sort_1.sort, shorten_1.shorten, split_quotes_1.splitQuotes, capitalise_1.capitaliseMessages, punctuation_1.punctuation, empty_1.empty, csv_1.toCsv);
}
exports.convert = convert;
