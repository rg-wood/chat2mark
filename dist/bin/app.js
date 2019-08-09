"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
class App {
    constructor() {
        this.program = commander;
        this.package = require('../../package.json');
    }
    initialize() {
        this.program
            .version(this.package.version)
            .command('convert <input> <output>', 'Convert Roll20 chat HTML to markdown post.')
            .parse(process.argv);
    }
}
exports.App = App;
const app = new App();
app.initialize();
