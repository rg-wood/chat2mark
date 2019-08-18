import { orphan } from '../src/orphan'
import { PlayerMessage, GameMasterMessage, Speech } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('stop()', () => {

  it('should combine orphaned player messages with the last speaker', () => {
    const messages = [
      new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')]),
      new PlayerMessage('', [new Speech(`We're being followed.`)])
    ]

    expect(orphan(messages)).to.deep.include.members([new PlayerMessage('Quinn', [
      new Speech('you do have an awful lot of stories.'),
      new Speech(`We're being followed.`)
    ])])
  })

  it('should not modify other kinds of messages', () => {
    const message = new GameMasterMessage([
      new Speech('you do have an awful lot of stories.'),
      new Speech(`We're being followed.`)
    ])

    expect(orphan([message])).to.deep.equal([message])
  })

  it('should not destroy previously collected messages messages', () => {
    const messages = [
      new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.'), new Speech('and then some.')]),
      new PlayerMessage('', [new Speech(`We're being followed.`)])
    ]

    expect(orphan(messages)).to.deep.include.members([new PlayerMessage('Quinn', [
      new Speech('you do have an awful lot of stories.'),
      new Speech('and then some.'),
      new Speech(`We're being followed.`)
    ])])
  })

})
