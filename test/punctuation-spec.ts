import { punctuation } from '../src/punctuation'
import { PlayerMessage, Action, Speech, PartialAction } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('punctuation()', () => {

  it('should end speech with full stop', () => {
    const message = new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories')])
    expect(punctuation([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])])
  })

  it('should end action with full stop', () => {
    const message = new PlayerMessage('Quinn', [new Action('grunts')])
    expect(punctuation([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Action('grunts.')])])
  })

  it('should end partial with full stop', () => {
    const message = new PlayerMessage('Quinn', [new PartialAction('Grunts', 'You do have an awful lot of stories')])
    expect(punctuation([message])).to.deep.include.members([new PlayerMessage('Quinn', [new PartialAction('Grunts', 'You do have an awful lot of stories.')])])
  })

  it('should not end speech with full stop at end already', () => {
    const message = new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])
    expect(punctuation([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('you do have an awful lot of stories.')])])
  })

  it('should strip out surrounding quotation marks', () => {
    const message = new PlayerMessage('Quinn', [new Speech('"Test"')])
    expect(punctuation([message])).to.deep.include.members([new PlayerMessage('Quinn', [new Speech('Test.')])])
  })

})
