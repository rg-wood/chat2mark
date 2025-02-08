import * as chai from 'chai'
import * as execa from 'execa'
import * as path from 'path'
import * as tempy from 'tempy'
import * as fs from 'fs-extra'

const assert = chai.assert

function chat2csv(args: string[]) {
  const script = path.resolve(__dirname, '../bin/chat2csv')
  const result = execa.sync(script, args)

  console.log(result.stdout)

  if (result.stderr) {
    console.log(result.stderr)
  }
}

function withTestFolder(testWith: (folder: string) => void) {
  const temp = tempy.directory()

  try {
    testWith(temp)
  } finally {
    fs.removeSync(temp)
  }
}

describe('chat2csv', () => {
  it('should convert Roll20 chat HTML to preprocessed CSV', () => {
    withTestFolder(folder => {
      const actualCsvFile = `${folder}/actual.csv`
      chat2csv(['test/fixtures/roll20.html', 'test/fixtures/discord.chat.csv', actualCsvFile])

      const actualCsv = fs.readFileSync(actualCsvFile, 'utf8')
      const expectedCsv = fs.readFileSync('test/fixtures/campaign-diary.csv', 'utf8')

      assert.strictEqual(expectedCsv, actualCsv)
    })
  })
})
