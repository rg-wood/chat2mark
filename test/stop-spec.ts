import { stop } from '../src/stop'
import { PlayerMessage, Action, Speech, PartialAction } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('stop()', () => {

  it('should end speech with full stop', () => {
    const message = new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories')])
    expect(stop([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])])
  })

  it('should end action with full stop', () => {
    const message = new PlayerMessage('Quinn', [new Action('grunts')])
    expect(stop([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Action('grunts.')])])
  })

  it('should end partial with full stop', () => {
    const message = new PlayerMessage('Quinn', [new PartialAction('Grunts', 'You do have an awful lot of stories')])
    expect(stop([message])).to.deep.include.members([new PlayerMessage('Quinn', [new PartialAction('Grunts', 'You do have an awful lot of stories.')])])
  })

  it('should not end speech with full stop at end already', () => {
    const message = new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])
    expect(stop([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])])
  })

})
