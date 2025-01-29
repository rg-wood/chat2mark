import { shorten } from '../src/shorten'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('shorten()', () => {

  const timestamp = new Date(Date.now())

  it('should shorten characters names', () => {
    const message = new Message('Quinn Wheatsteal', 'says', 'You do have an awful lot of stories.', timestamp)
    expect(shorten([message])).to.deep.include.members([new Message('Quinn', 'says', message.message, timestamp)])
  })

  it('should not shorten short characters names', () => {
    const message = new Message('Orin', 'says', 'You do have an awful lot of stories.', timestamp)
    expect(shorten([message])).to.deep.include.members([message])
  })

})
