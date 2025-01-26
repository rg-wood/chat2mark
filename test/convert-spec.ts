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
  // it('should convert Roll20 chat HTML to markdown', () => {
  //   withTestFolder(folder => {
  //     const actualMarkdownFile = `${folder}/actual.md`
  //     chat2mark(['convert', 'test/roll20.html', actualMarkdownFile])

  //     const actualMarkdown = fs.readFileSync(actualMarkdownFile, 'utf8')
  //     const expectedMarkdown = fs.readFileSync('test/campaign-diary.md', 'utf8')

  //     assert.strictEqual(expectedMarkdown, actualMarkdown)
  //   })
  // })

  // it('should convert Roll20 chat HTML to preprocessed CSV', () => {
  //   withTestFolder(folder => {
  //     const actualCsvFile = `${folder}/actual.csv`
  //     chat2mark(['convert', '-p', 'test/roll20.html', actualCsvFile])

  //     const actualCsv = fs.readFileSync(actualCsvFile, 'utf8')
  //     const expectedCsv = fs.readFileSync('test/campaign-diary.csv', 'utf8')

  //     assert.strictEqual(expectedCsv, actualCsv)
  //   })
  // })

  // it('should convert Roll20 preprocessed CSV to chat HTML (postprocess)', () => {
  //   withTestFolder(folder => {
  //     const actualCsvFile = `${folder}/actual.csv`
  //     const actualMarkdownFile = `${folder}/actual.md`

  //     chat2mark(['convert', '-p', 'test/roll20.html', actualCsvFile])
  //     chat2mark(['convert', '-r', actualCsvFile, actualMarkdownFile])

  //     const actualMarkdown = fs.readFileSync(actualMarkdownFile, 'utf8')
  //     const expectedMarkdown = fs.readFileSync('test/campaign-diary.md', 'utf8')

  //     assert.strictEqual(expectedMarkdown, actualMarkdown)
  //   })
  // })
})
