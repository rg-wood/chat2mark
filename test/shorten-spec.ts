import { shorten } from '../src/shorten'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('shorten()', () => {

  it('should shorten characters names', () => {
    const message = new Message('Quinn Wheatsteal', 'says', 'You do have an awful lot of stories.')
    expect(shorten([message])).to.deep.include.members([new Message('Quinn', 'says', message.message)])
  })

  it('should not shorten short characters names', () => {
    const message = new Message('Orin', 'says', 'You do have an awful lot of stories.')
    expect(shorten([message])).to.deep.include.members([message])
  })

})
