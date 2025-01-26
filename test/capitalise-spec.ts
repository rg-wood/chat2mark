import { capitaliseMessages } from '../src/capitalise'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('capitaliseMessages()', () => {

  it('should capitalise speech', () => {
    const message = new Message('Quinn', 'says', 'you do have an awful lot of stories.')
    expect(capitaliseMessages([message])).to.deep.include.members([new Message('Quinn', 'says', 'You do have an awful lot of stories.')])
  })

  it('should not capitalise action', () => {
    const message = new Message('Quinn', 'does', 'Grunts.')
    expect(capitaliseMessages([message])).to.deep.include.members([new Message('Quinn', 'does', 'grunts.')])
  })


})
