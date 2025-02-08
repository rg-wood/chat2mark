import { capitaliseMessages } from '../src/capitalise'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('capitaliseMessages()', () => {

  const timestamp = new Date(Date.now())

  it('should capitalise speech', () => {
    const message = new Message('Quinn', 'says', 'ic', 'you do have an awful lot of stories.', timestamp)
    expect(capitaliseMessages([message])).to.deep.include.members([new Message('Quinn', 'says', 'ic', 'You do have an awful lot of stories.', timestamp)])
  })

  it('should not capitalise action', () => {
    const message = new Message('Quinn', 'does', 'ic', 'Grunts.', timestamp)
    expect(capitaliseMessages([message])).to.deep.include.members([new Message('Quinn', 'does', 'ic', 'grunts.', timestamp)])
  })


})
