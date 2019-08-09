import * as chai from 'chai'
import * as execa from 'execa'
import * as path from 'path'
import * as tempy from 'tempy'
import * as fs from 'fs-extra'

const assert = chai.assert

function chat2mark(args: string[]) {
  const script = path.resolve(__dirname, '../bin/chat2mark')
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

describe('chat2mark', () => {
  it('should convert Roll20 chat HTML to markdown', () => {
    withTestFolder(folder => {
      const actualMarkdownFile = `${folder}/actual.md`
      chat2mark(['convert', 'test/roll20.html', actualMarkdownFile])

      const actualMarkdown = fs.readFileSync(actualMarkdownFile, 'utf8')
      const expectedMarkdown = fs.readFileSync('test/campaign-diary.md', 'utf8')

      assert.strictEqual(expectedMarkdown, actualMarkdown)
    })
  })
})
