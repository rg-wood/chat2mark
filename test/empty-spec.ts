import { empty } from '../src/empty'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('empty()', () => {

  const timestamp = new Date(Date.now())

  it('should filter empty messages', () => {
    const message = new Message('Quinn', 'says', '', timestamp)
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should not filter non-empty messages', () => {
    const message = new Message('Quinn', 'says', 'hallo', timestamp)
    expect(empty([message])).to.be.not.deep.equal([])
  })

  it('should filter empty roll roller', () => {
    const message = new Message('', 'rolls', 'Stealth: 11', timestamp)
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should filter empty roll check', () => {
    const message = new Message('Orin', 'rolls', '', timestamp)
    expect(empty([message])).to.be.deep.equal([])
  })

})
