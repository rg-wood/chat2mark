import { empty } from '../src/empty'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('empty()', () => {

  it('should filter empty messages', () => {
    const message = new Message('Quinn', 'says', '')
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should not filter non-empty messages', () => {
    const message = new Message('Quinn', 'says', 'hallo')
    expect(empty([message])).to.be.not.deep.equal([])
  })

  it('should filter empty roll roller', () => {
    const message = new Message('', 'rolls', 'Stealth: 11')
    expect(empty([message])).to.be.deep.equal([])
  })

  it('should filter empty roll check', () => {
    const message = new Message('Orin', 'rolls', '')
    expect(empty([message])).to.be.deep.equal([])
  })

})
