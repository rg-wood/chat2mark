import * as commander from 'commander'
import { convert } from '../convert'
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
      .arguments('<roll20.html> <discord.csv <output>')
      .action((ic, ooc, output, options) => {

        if (
          typeof ic === 'string' &&
          typeof ooc === 'string' &&
          typeof output === 'string'
        ) {
          const body = fs.readFileSync(ic, 'utf8')

          fs.writeFileSync(output, convert(ooc)(body))
        }
      })
      .parse(process.argv)
  }

}

const app = new Convert()
app.initialize()
