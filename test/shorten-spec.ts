import { shorten } from '../src/shorten'
import { PlayerMessage, Speech } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('shorten()', () => {

  it('should shorten characters names', () => {
    const message = new PlayerMessage('Quinn Wheatsteal', [new Speech('You do have an awful lot of stories.')])
    expect(shorten([message])).to.deep.include.members([new PlayerMessage('Quinn', message.events)])
  })

  it('should not shorten short characters names', () => {
    const message = new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])
    expect(shorten([message])).to.deep.include.members([message])
  })

})
