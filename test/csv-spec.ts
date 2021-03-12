import { toCsv, parseCsv } from '../src/csv'
import { PlayerMessage, GameMasterMessage, Action, Speech, Rolls, Roll, Private, PartialAction } from '../src/messages'
import * as chai from 'chai'
import { stripIndent } from 'common-tags'

const expect = chai.expect

describe('toCsv()', () => {

  it('should add CSV column header', () => {
    expect(toCsv([])).to.include(`kind,subkind,actor,message,action,result,check`)
  })

  it('should include simple speech message', () => {
    expect(toCsv([new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])])).to.include(
      stripIndent`
        player,,"Orin"
        ,speech,,"You do have an awful lot of stories."
      `
    )
  })

  it('should include complex speech message', () => {
    const message: PlayerMessage =
      new PlayerMessage(
        'Orin',
        [
          new Speech('You do have an awful lot of stories.'),
          new Speech('But they are all boring!')
        ]
      )

    expect(toCsv([message])).to.include(
      stripIndent`
        player,,"Orin"
        ,speech,,"You do have an awful lot of stories."
        ,speech,,"But they are all boring!"
      `
    )
  })

  it('should include simple action message', () => {
    expect(toCsv([new PlayerMessage('Orin', [new Action('raises an eyebrow at Quinn.')])])).to.include(
      stripIndent`
        player,,"Orin"
        ,action,,,"raises an eyebrow at Quinn."
      `
    )
  })

  it('should include complex action message', () => {
    const message: PlayerMessage =
      new PlayerMessage(
        'Orin',
        [
          new Action('raises an eyebrow at Quinn.'),
          new Action('Takes a bite out of an apple.')
        ]
      )

    expect(toCsv([message])).to.include(
      stripIndent`
        player,,"Orin"
        ,action,,,"raises an eyebrow at Quinn."
        ,action,,,"Takes a bite out of an apple."
      `
    )
  })

  it('should include complex action and speech message', () => {
    const message: PlayerMessage =
      new PlayerMessage(
        'Orin',
        [
          new Action('raises an eyebrow at Quinn.'),
          new Speech('That sounds strange.')
        ]
      )

    expect(toCsv([message])).to.include(
      stripIndent`
        player,,"Orin"
        ,action,,,"raises an eyebrow at Quinn."
        ,speech,,"That sounds strange."
      `
    )
  })

  it('should include simple roll message', () => {
    expect(toCsv([new Rolls([new Roll('Orin', 9, 'Stealth')])])).to.include(
      stripIndent`
        rolls
        ,roll,"Orin",,,9,"Stealth"
      `
    )
  })

  it('should include simple roll message without check', () => {
    expect(toCsv([new Rolls([new Roll('Orin', 9)])])).to.include(
      stripIndent`
        rolls
        ,roll,"Orin",,,9
      `
    )
  })

  it('should include multiple roll message', () => {
    expect(toCsv([new Rolls([new Roll('Orin', 9, 'Stealth'), new Roll('Quinn', 15, 'Perception')])])).to.include(
      stripIndent`
        rolls
        ,roll,"Orin",,,9,"Stealth"
        ,roll,"Quinn",,,15,"Perception"
      `)
  })

  it('should include private message', () => {
    expect(toCsv([new Private()])).to.include(
      stripIndent`
        private
      `
    )
  })

  it('should include partial action', () => {
    expect(toCsv([new PlayerMessage('Biron', [new PartialAction('grunts', 'Best way to learn.')])])).to.include(
      stripIndent`
        player,,"Biron"
        ,partial,,"Best way to learn.","grunts"
      `
    )
  })

  it('should include partial action mixed with another message', () => {
    const message = new PlayerMessage(
      'Biron',
      [
        new PartialAction('grunts', 'Best way to learn.'),
        new Speech('That sounds strange.')
      ]
    )

    expect(toCsv([message])).to.include(
      stripIndent`
        player,,"Biron"
        ,partial,,"Best way to learn.","grunts"
        ,speech,,"That sounds strange."
      `
    )
  })

  it('should include GM speech', () => {
    expect(toCsv([new GameMasterMessage([new Speech('Hello, World')])])).to.include(
      stripIndent`
        gm
        ,speech,,"Hello, World"
      `
    )
  })

})

describe('parseCsv()', () => {

  it('should parse a simple speech message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        player,,"Orin"
        ,speech,,"You do have an awful lot of stories."
      `

    const expected = new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])
    expect(parseCsv(csv)).to.deep.include.members([expected])
  })

  it('should parse a simple action message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        player,,"Orin"
        ,action,,,"raises an eyebrow at Quinn."
      `

    const expected = new PlayerMessage('Orin', [new Action('raises an eyebrow at Quinn.')])
    expect(parseCsv(csv)).to.deep.include.members([expected])
  })


  it('should parse a private message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        private
      `

    expect(parseCsv(csv)).to.deep.include.members([new Private])
  })

  it('should parse simple roll message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        rolls
        ,roll,"Biron",,,20,"Stealth"
      `

    expect(parseCsv(csv)).to.deep.include.members([new Rolls([new Roll('Biron', 20, 'Stealth')])])
  })

  it('should parse a partial action message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        player,,"Biron"
        ,partial,,"nothin we need worry about","grunts"
      `

    const expected = new PlayerMessage('Biron', [new PartialAction('grunts', 'nothin we need worry about')])
    expect(parseCsv(csv)).to.deep.include.members([expected])
  })

  it('should parse GM message', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        gm
        ,speech,,"They soon disappear into the night as well."
      `

    const expected = new GameMasterMessage([new Speech('They soon disappear into the night as well.')])
    expect(parseCsv(csv)).to.deep.include.members([expected])
  })

  it('should parse unknown roll format without check field', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        rolls
        ,roll,"Biron",,,20
      `

    expect(parseCsv(csv)).to.deep.include.members([new Rolls([new Roll('Biron', 20)])])

  })

  it('should parse player message with multiple events', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        player,,"Orin"
        ,speech,,"You do have an awful lot of stories."
        ,partial,,"nothin we need worry about","grunts"
      `

    const expected =
    new PlayerMessage('Orin',
      [
        new Speech('You do have an awful lot of stories.'),
        new PartialAction('grunts', 'nothin we need worry about')
      ]
    )

    expect(parseCsv(csv)).to.deep.include.members([expected])
  })

  it('should parse multiple messages', () => {
    const csv =
      stripIndent`
        kind,subkind,actor,message,action,result,check
        player,,"Orin"
        ,speech,,"You do have an awful lot of stories."
        rolls
        ,roll,"Biron",,,20
      `

    const expected1 = new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')])
    const expected2 = new Rolls([new Roll('Biron', 20)])

    expect(parseCsv(csv)).to.deep.include.members([expected1])
  })

})
