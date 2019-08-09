import { capitaliseMessages } from '../src/capitalise'
import { PlayerMessage, Action, Speech, PartialAction } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('capitaliseMessages()', () => {

  it('should capitalise speech', () => {
    const message = new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])
    expect(capitaliseMessages([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('You do have an awful lot of stories.')])])
  })

  it('should not capitalise action', () => {
    const message = new PlayerMessage('Quinn', [new Action('grunts.')])
    expect(capitaliseMessages([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Action('grunts.')])])
  })

  it('should not capitalise partial action action', () => {
    const message = new PlayerMessage('Quinn', [new PartialAction('Grunts', 'You do have an awful lot of stories.')])
    expect(capitaliseMessages([message])).to.deep.include.members([new PlayerMessage('Quinn', [new PartialAction('grunts', 'You do have an awful lot of stories.')])])
  })

  it('should capitalise partial action message', () => {
    const message = new PlayerMessage('Quinn', [new PartialAction('grunts', 'you do have an awful lot of stories.')])
    expect(capitaliseMessages([message])).to.deep.include.members([new PlayerMessage('Quinn', [new PartialAction('grunts', 'You do have an awful lot of stories.')])])
  })

})
