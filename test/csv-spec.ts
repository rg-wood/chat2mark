import { toCsv/*, parseCsv*/ } from '../src/csv'
import { Message } from '../src/messages'
import * as chai from 'chai'
import { stripIndent } from 'common-tags'

const expect = chai.expect

describe('toCsv()', () => {

  const timestamp = new Date(Date.now())

  it('should add CSV column header', () => {
    expect(toCsv([])).to.include(`timestamp,actor,type,chat,message`)
  })

  it('should include simple speech message', () => {
    expect(toCsv([new Message('Orin', 'says', 'ic', 'You do have an awful lot of stories.', timestamp)])).to.include(
      stripIndent`
        "${timestamp.toUTCString()}","Orin",says,ic,"You do have an awful lot of stories."
      `
    )
  })

  it('should include simple action message', () => {
    expect(toCsv([new Message('Orin', 'does', 'ic', 'raises an eyebrow at Quinn.', timestamp)])).to.include(
      stripIndent`
        "${timestamp.toUTCString()}","Orin",does,ic,"raises an eyebrow at Quinn."
      `
    )
  })

  it('should include simple roll message', () => {
    expect(toCsv([new Message('Orin', 'rolls', 'ooc', 'Stealth (9)', timestamp)])).to.include(
      stripIndent`
        "${timestamp.toUTCString()}","Orin",rolls,ooc,"Stealth (9)"
      `
    )
  })

})
