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
            .option('-p, --preprocess', 'output pre-processed CSV data only')
            .option('-r, --postprocess', 'post-process CSV data')
            .action((input, output, options) => {
            const doPreprocess = options.preprocess !== undefined && options.preprocess;
            const doPostprocess = options.postprocess !== undefined && options.postprocess;
            if (typeof input === 'string' &&
                typeof output === 'string' &&
                typeof doPreprocess === 'boolean' &&
                typeof doPostprocess === 'boolean') {
                const body = fs.readFileSync(input, 'utf8');
                if (doPreprocess)
                    fs.writeFileSync(output, convert_1.preprocess(body));
                else if (doPostprocess)
                    fs.writeFileSync(output, convert_1.postprocess(body));
                else
                    fs.writeFileSync(output, convert_1.convert(body));
            }
        })
            .parse(process.argv);
    }
}
exports.Convert = Convert;
const app = new Convert();
app.initialize();
