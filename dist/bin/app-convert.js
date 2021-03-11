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
            .arguments('<input> <output>')
            .option('-p, --preprocess', 'Output pre-processed CSV data only')
            .action((input, output, options) => {
            const doPreprocess = options.preprocess !== undefined && options.preprocess;
            if (typeof input === 'string' && typeof output === 'string' && typeof doPreprocess === 'boolean') {
                const html = fs.readFileSync(input, 'utf8');
                if (doPreprocess)
                    fs.writeFileSync(output, convert_1.preprocess(html));
                else
                    fs.writeFileSync(output, convert_1.convert(html));
            }
        })
            .parse(process.argv);
    }
}
exports.Convert = Convert;
const app = new Convert();
app.initialize();
