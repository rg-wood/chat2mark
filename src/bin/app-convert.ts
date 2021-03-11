import * as commander from 'commander'
import { convert, preprocess } from '../convert'
import * as fs from 'fs-extra'

export class Convert {

  private readonly program: commander.CommanderStatic

  private readonly package: Record<string, string>

  public constructor () {
    this.program = commander
    this.package = require('../../package.json')
  }

  public initialize (): void {
    this.program
      .version(this.package.version)
      .arguments('<input> <output>')
      .option('-p, --preprocess', 'Output pre-processed CSV data only')
      .action((input, output, options) => {
        const doPreprocess = options.preprocess !== undefined && options.preprocess

        if (typeof input === 'string' && typeof output === 'string' && typeof doPreprocess === 'boolean') {
          const html = fs.readFileSync(input, 'utf8')

          if (doPreprocess) fs.writeFileSync(output, preprocess(html))
          else fs.writeFileSync(output, convert(html))
        }
      })
      .parse(process.argv)
  }

}

const app = new Convert()
app.initialize()
