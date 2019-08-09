"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const convert_1 = require("../convert");
const fs = require("fs-extra");
class Convert {
    constructor() {
        this.program = commander;
        this.package = require('../../package.json');
    }
    initialize() {
        this.program
            .version(this.package.version)
            .arguments('<input> <output>')
            .action((input, output) => {
            if (typeof input === 'string' && typeof output === 'string') {
                const html = fs.readFileSync(input, 'utf8');
                fs.writeFileSync(output, convert_1.convert(html));
            }
        })
            .parse(process.argv);
    }
}
exports.Convert = Convert;
const app = new Convert();
app.initialize();
