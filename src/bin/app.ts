import * as commander from 'commander'

export class App {

  private readonly program: commander.CommanderStatic

  private readonly package: Record<string, string>

  public constructor () {
    this.program = commander
    this.package = require('../../package.json')
  }

  public initialize (): void {
    this.program
      .version(this.package.version)
      .command('convert <input> <output> [-p]', 'Convert Roll20 chat HTML to markdown post.')
      .parse(process.argv)
  }

}

const app = new App()
app.initialize()
