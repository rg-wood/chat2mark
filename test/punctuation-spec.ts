import { punctuation } from '../src/punctuation'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('punctuation()', () => {

  const timestamp = new Date(Date.now())

  it('should end speech with full stop', () => {
    const message = new Message('Quinn', 'says', 'you do have an awful lot of stories', timestamp)
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'you do have an awful lot of stories.', timestamp)])
  })

  it('should end action with full stop', () => {
    const message = new Message('Quinn', 'does', 'grunts', timestamp)
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'does', 'grunts.', timestamp)])
  })

  it('should not end speech with full stop at end already', () => {
    const message = new Message('Quinn', 'says', 'you do have an awful lot of stories.', timestamp)
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'you do have an awful lot of stories.', timestamp)])
  })

  it('should strip out surrounding quotation marks', () => {
    const message = new Message('Quinn', 'says', '"Test"', timestamp)
    expect(punctuation([message])).to.deep.include.members([new Message('Quinn', 'says', 'Test.', timestamp)])
  })

})
