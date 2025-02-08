"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
function flatten(arrays) {
    return [].concat(...arrays);
}
exports.flatten = flatten;
