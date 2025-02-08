import { multiline } from '../src/multiline'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('multiline()', () => {

  const timestamp = new Date(Date.now())

  it('should not split single line messages', () => {
    const message = new Message('Quinn', 'says', 'ic', 'hallo', timestamp)
    expect(multiline([message])).to.be.deep.equal([message])
  })

  it('should split multiline messages into multiple files', () => {
    const message = new Message('Quinn', 'says', 'ic', '12\n34\n\r56', timestamp)
    expect(multiline([message])).to.be.deep.equal([
        new Message('Quinn', 'says', 'ic', '12', timestamp),
        new Message('Quinn', 'says', 'ic', '34', timestamp),
        new Message('Quinn', 'says', 'ic', '56', timestamp)
    ])
  })

})
