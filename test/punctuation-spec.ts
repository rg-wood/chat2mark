import { punctuation } from '../src/punctuation'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('punctuation()', () => {

  it('should end speech with full stop', () => {
    const message = new Message('Quinn', 'says', 'you do have an awful lot of stories')
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'you do have an awful lot of stories.')])
  })

  it('should end action with full stop', () => {
    const message = new Message('Quinn', 'does', 'grunts')
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'does', 'grunts.')])
  })

  it('should not end speech with full stop at end already', () => {
    const message = new Message('Quinn', 'says', 'you do have an awful lot of stories.')
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'you do have an awful lot of stories.')])
  })

  it('should strip out surrounding quotation marks', () => {
    const message = new Message('Quinn', 'says', '"Test"')
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'Test.')])
  })

})
