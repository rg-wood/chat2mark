"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function groupAdjacent(array, cb) {
    return array.reduce(function (prev, cur) {
        if (prev.length > 0) {
            const group = prev[prev.length - 1];
            const last = group[group.length - 1];
            if (cb(last, cur)) {
                group.push(cur);
            }
            else {
                prev.push([cur]);
            }
        }
        else {
            prev.push([cur]);
        }
        return prev;
    }, []);
}
exports.groupAdjacent = groupAdjacent;
