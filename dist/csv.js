"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromOocCsv = exports.toCsv = void 0;
const messages_1 = require("./messages");
const parse = require("csv-parse/lib/es5/sync");
exports.toCsv = (messages) => {
    const header = 'timestamp,actor,type,chat,message\n';
    return header +
        messages
            .map(renderMessage)
            .join('\n');
};
const renderMessage = (message) => {
    return `"${message.timestamp !== undefined ? message.timestamp.toUTCString() : ''}","${message.actor}",${message.type},${message.chat},"${message.message}"`;
};
function fromOocCsv(csv) {
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true
    });
    return records.map((record) => {
        if (record.Author !== undefined && record.Content !== undefined && record.Date !== undefined) {
            return new messages_1.Message(record.Author, 'says', 'ooc', record.Content, new Date(Date.parse(record.Date)));
        }
    })
        .filter((message) => message !== undefined);
}
exports.fromOocCsv = fromOocCsv;
