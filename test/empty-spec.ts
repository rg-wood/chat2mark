import { empty } from '../src/empty'
import { PlayerMessage, GameMasterMessage, Speech } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('empty()', () => {

  it('should filter empty speech messages', () => {
    const message = new PlayerMessage('Quinn', [new Speech('')])
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should not filter speech messages', () => {
    const message = new PlayerMessage('Quinn', [new Speech('hallo')])
    expect(empty([message])).to.be.not.deep.equal([])
  })

  it('should not other message types', () => {
    const message = new GameMasterMessage([new Speech('You do have an awful lot of stories.')])
    expect(empty([message])).to.be.deep.equal([message])
  })

})
