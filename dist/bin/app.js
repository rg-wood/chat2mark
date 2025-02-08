"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
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
            .arguments('<roll20.html> <discord.csv <output>')
            .action((ic, ooc, output, options) => {
            if (typeof ic === 'string' &&
                typeof ooc === 'string' &&
                typeof output === 'string') {
                const body = fs.readFileSync(ic, 'utf8');
                fs.writeFileSync(output, convert_1.convert(ooc)(body));
            }
        })
            .parse(process.argv);
    }
}
exports.Convert = Convert;
const app = new Convert();
app.initialize();
