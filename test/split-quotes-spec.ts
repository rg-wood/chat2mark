import { splitQuotes } from '../src/split-quotes'
import { PlayerMessage, Action, Speech } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('splitQuotes()', () => {

  it('should split quotes in actions', () => {
    const message = new PlayerMessage('Quinn', [new Action(`crawls back into the cave and shakes Biron, then Orin ''wake up, someone comes!''`)])

    expect(splitQuotes([message])).to.deep.include.members([
      new PlayerMessage('Quinn', [
        new Action('crawls back into the cave and shakes Biron, then Orin'),
        new Speech('wake up, someone comes!')
      ])
    ])
  })

})
