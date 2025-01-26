import { toCsv/*, parseCsv*/ } from '../src/csv'
import { Message } from '../src/messages'
import * as chai from 'chai'
import { stripIndent } from 'common-tags'

const expect = chai.expect

describe('toCsv()', () => {

  it('should add CSV column header', () => {
    expect(toCsv([])).to.include(`actor,type,message`)
  })

  it('should include simple speech message', () => {
    expect(toCsv([new Message('Orin', 'says', 'You do have an awful lot of stories.')])).to.include(
      stripIndent`
        "Orin",says,"You do have an awful lot of stories."
      `
    )
  })

  it('should include simple action message', () => {
    expect(toCsv([new Message('Orin', 'does', 'raises an eyebrow at Quinn.')])).to.include(
      stripIndent`
        "Orin",does,"raises an eyebrow at Quinn."
      `
    )
  })

  it('should include simple roll message', () => {
    expect(toCsv([new Message('Orin', 'rolls', 'Stealth (9)')])).to.include(
      stripIndent`
        "Orin",rolls,"Stealth (9)"
      `
    )
  })

})

// describe('parseCsv()', () => {

//   it('should parse a simple speech message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         player,,"Orin"
//         ,speech,,"You do have an awful lot of stories."
//       `

//     const expected = new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])
//     expect(parseCsv(csv)).to.deep.include.members([expected])
//   })

//   it('should parse a simple action message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         player,,"Orin"
//         ,action,,,"raises an eyebrow at Quinn."
//       `

//     const expected = new PlayerMessage('Orin', [new Action('raises an eyebrow at Quinn.')])
//     expect(parseCsv(csv)).to.deep.include.members([expected])
//   })


//   it('should parse a private message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         private
//       `

//     expect(parseCsv(csv)).to.deep.include.members([new Private])
//   })

//   it('should parse simple roll message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         rolls
//         ,roll,"Biron",,,20,"Stealth"
//       `

//     expect(parseCsv(csv)).to.deep.include.members([new Rolls([new Roll('Biron', 20, 'Stealth')])])
//   })

//   it('should parse a partial action message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         player,,"Biron"
//         ,partial,,"nothin we need worry about","grunts"
//       `

//     const expected = new PlayerMessage('Biron', [new PartialAction('grunts', 'nothin we need worry about')])
//     expect(parseCsv(csv)).to.deep.include.members([expected])
//   })

//   it('should parse GM message', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         gm
//         ,speech,,"They soon disappear into the night as well."
//       `

//     const expected = new GameMasterMessage([new Speech('They soon disappear into the night as well.')])
//     expect(parseCsv(csv)).to.deep.include.members([expected])
//   })

//   it('should parse unknown roll format without check field', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         rolls
//         ,roll,"Biron",,,20
//       `

//     expect(parseCsv(csv)).to.deep.include.members([new Rolls([new Roll('Biron', 20)])])

//   })

//   it('should parse player message with multiple events', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         player,,"Orin"
//         ,speech,,"You do have an awful lot of stories."
//         ,partial,,"nothin we need worry about","grunts"
//       `

//     const expected =
//     new PlayerMessage('Orin',
//       [
//         new Speech('You do have an awful lot of stories.'),
//         new PartialAction('grunts', 'nothin we need worry about')
//       ]
//     )

//     expect(parseCsv(csv)).to.deep.include.members([expected])
//   })

//   it('should parse multiple messages', () => {
//     const csv =
//       stripIndent`
//         kind,subkind,actor,message,action,result,check
//         player,,"Orin"
//         ,speech,,"You do have an awful lot of stories."
//         rolls
//         ,roll,"Biron",,,20
//       `

//     const expected1 = new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])
//     const expected2 = new Rolls([new Roll('Biron', 20)])

//     expect(parseCsv(csv)).to.deep.include.members([expected1])
//   })

// })
