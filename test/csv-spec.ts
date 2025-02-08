import { toCsv, fromOocCsv } from '../src/csv'
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

describe('fromOocCsv', () => {

  const timestamp = new Date(2021, 2, 25, 19, 29)

  it('should parse a simple OOC message', () => {
    const csv = `AuthorID,Author,Date,Content,Attachments,Reactions
"281029674837082113","Ric#0018","25-Mar-21 07:29 PM","Ha ha ha ha","",""`

    const expected = new Message('Ric#0018', 'says', 'ooc', 'Ha ha ha ha', timestamp)
    expect(fromOocCsv(csv)).to.deep.include.members([expected])
  })

//   it('should collect messages with new lines', () => {
//     const csv = `AuthorID,Author,Date,Content,Attachments,Reactions
// "281029674837082113","Ric#0018","25-Mar-21 07:29 PM","Ha ha ha ha","",""
// Rule #4: More than one species of baby flopping around is cute.
// Rule #5: Fisheye lens + baby animal is always cute.[9][10]`

//     const expected = 
//     expect(fromOocCsv(csv)).to.deep.include.members([
//       new Message('Ric#0018', 'says', 'ooc', 'Ha ha ha ha', timestamp),
//       new Message('', 'says', 'ooc', 'Rule #4: More than one species of baby flopping around is cute.', timestamp),
//       new Message('', 'says', 'ooc', 'Rule #5: Fisheye lens + baby animal is always cute.[9][10]', timestamp)
//     ])
//   })

//   it('should collect messages with new Windows lines', () => {
//     const csv = `AuthorID,Author,Date,Content,Attachments,Reactions
// "281029674837082113","Ric#0018","25-Mar-21 07:29 PM","Ha ha ha ha\nRule #4: More than one species of baby flopping around is cute.\r\nRule #5: Fisheye lens + baby animal is always cute.[9][10]","",""`

//     console.log(csv)
//     expect(fromOocCsv(csv)).to.deep.include.members([
//       new Message('Ric#0018', 'says', 'ooc', 'Ha ha ha ha', timestamp),
//       new Message('', 'says', 'ooc', 'Rule #4: More than one species of baby flopping around is cute.', timestamp),
//       new Message('', 'says', 'ooc', 'Rule #5: Fisheye lens + baby animal is always cute.[9][10]', timestamp)
//     ])
//   })

})
