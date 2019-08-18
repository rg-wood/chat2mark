import { empty } from '../src/empty'
import { PlayerMessage, GameMasterMessage, Speech, Rolls, Roll } from '../src/messages'
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

  it('should not filter other message types', () => {
    const message = new GameMasterMessage([new Speech('You do have an awful lot of stories.')])
    expect(empty([message])).to.be.deep.equal([message])
  })

  it('should filter empty GM messages', () => {
    const message = new GameMasterMessage([])
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should filter empty roll roller', () => {
    const message = new Rolls([new Roll('', 11, 'Stealth')])
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should filter empty roll check', () => {
    const message = new Rolls([new Roll('Orin', 11, '')])
    expect(empty([message])).to.be.deep.equal([])
  })

})
