"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
function byTimeStamp(a, b) {
    if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp < b.timestamp)
        return -1;
    else if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp > b.timestamp)
        return 1;
    else if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp === b.timestamp)
        return 0;
    else if (a.timestamp === undefined && b.timestamp !== undefined)
        return -1;
    else if (a.timestamp !== undefined && b.timestamp === undefined)
        return 1;
    else
        return 0;
}
exports.sort = (messages) => {
    return messages.sort(byTimeStamp);
};
