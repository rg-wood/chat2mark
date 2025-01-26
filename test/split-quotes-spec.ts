import { splitQuotes } from '../src/split-quotes'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('splitQuotes()', () => {

  const timestamp = new Date(Date.now())

  it('should split quotes in actions', () => {
    const message = new Message('Quinn', 'does', 'crawls back into the cave and shakes Biron, then Orin "wake up, someone comes!"', timestamp)

    expect(splitQuotes([message])).to.deep.include.members([
      new Message('Quinn', 'does', 'crawls back into the cave and shakes Biron, then Orin', timestamp),
      new Message('Quinn', 'says', 'wake up, someone comes!', timestamp)
    ])
  })

})
