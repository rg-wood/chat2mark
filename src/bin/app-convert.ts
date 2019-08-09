import * as commander from 'commander'
import { convert } from '../convert'
import * as fs from 'fs-extra'

export class Convert {

  private program: commander.CommanderStatic

  private package: any

  public constructor() {
    this.program = commander
    this.package = require('../../package.json')
  }

  public initialize(): void {
    this.program
      .version(this.package.version)
      .arguments('<input> <output>')
      .action((input, output) => {
        if (typeof input === 'string' && typeof output === 'string') {
          const html = fs.readFileSync(input, 'utf8')
          fs.writeFileSync(output, convert(html))
        }
      })
      .parse(process.argv)
  }

}

const app = new Convert()
app.initialize()
