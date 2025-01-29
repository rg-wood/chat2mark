import * as commander from 'commander'
import { preprocess } from '../convert'
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
      .option('-p, --preprocess', 'output pre-processed CSV data only')
      .option('-r, --postprocess', 'post-process CSV data')
      .action((input, output, options) => {
        const doPreprocess = options.preprocess !== undefined && options.preprocess
        const doPostprocess = options.postprocess !== undefined && options.postprocess

        if (
          typeof input === 'string' &&
          typeof output === 'string' &&
          typeof doPreprocess === 'boolean' &&
          typeof doPostprocess === 'boolean'
        ) {
          const body = fs.readFileSync(input, 'utf8')

          fs.writeFileSync(output, preprocess(body))
          // if (doPreprocess) fs.writeFileSync(output, preprocess(body))
          // else if (doPostprocess) fs.writeFileSync(output, postprocess(body))
          // else fs.writeFileSync(output, convert(body))
        }
      })
      .parse(process.argv)
  }

}

const app = new Convert()
app.initialize()
