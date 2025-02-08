import { parseChat } from '../src/parse'
import { Message } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('parseChat()', () => {

  const timestamp = new Date(2019, 6, 4, 21, 36)

  it('should parse a simple speech message', () => {
    const html = `
    <div class='message general' data-messageid='-LiygukE4o5mdt8-pZ_G'>
      <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
      <span class='by'>Orin:</span>
      You do have an awful lot of stories.
    </div>`

    const expected = new Message('Orin', 'says', 'ic', 'You do have an awful lot of stories.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse a simple action message', () => {
    const html = `
    <div class='message emote' data-messageid='-LiygrJkaQTP_Cmoi02m'>
      <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
      Orin raises an eyebrow at Quinn.
    </div>`

    const expected = new Message('Orin', 'does', 'ic', 'raises an eyebrow at Quinn.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse a characters first name and last name', () => {
    const html = `
    <div class='message emote' data-messageid='-LiygrJkaQTP_Cmoi02m'>
        Quinn Wheatsteal raises an eyebrow at Orin.
    </div>`

    const expected = new Message('Quinn Wheatsteal', 'does', 'ic', 'raises an eyebrow at Orin.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse a NPCs type like the soldier', () => {
    const html = `
    <div class='message emote' data-messageid='-LiygrJkaQTP_Cmoi02m'>
        <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
        The soldier raises an eyebrow at Orin.
    </div>`

    const expected = new Message('The soldier', 'does', 'ic', 'raises an eyebrow at Orin.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse simple private message', () => {
    const html = `
    <div class='message rollresult private' data-messageid='-Liyjlr-ld4tBx_Jh4vE' data-playerid='-KsYuRIDFt8Tfx99PXO6'>
        <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
        <span class='by'>Ric (GM):</span>
        <div class='rolled'>9</div>
    </div>`

    expect(parseChat(html)).to.deep.include.members([])
  })

  it('should parse simple roll message', () => {
    const html = `
    <div class='message general' data-messageid='-Liykp8HmEbuDqL4ouvn'>
        <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
        <span class='by'>Biron:</span>
        <div class='sheet-rolltemplate-simple'>
            <div class='sheet-container'>
                <div class='sheet-result'>
                    <div class='sheet-adv'>
                        <span><span class='inlinerollresult showtip tipsy-n-right' title='Rolling 1d20+2 = (<span class=&quot;basicdiceroll&quot;>18</span>)+2'>20</span>
                        </span>
                    </div>
                    <div class='sheet-advspacer'></div>
                    <div class='sheet-adv'>
                        <span><span class='inlinerollresult showtip tipsy-n-right' title='Rolling 1d20+2 = (<span class=&quot;basicdiceroll&quot;>4</span>)+2'>6</span>
                        </span>
                    </div>
                </div>
                <div class='sheet-label'>
                    <span>STEALTH <span>(2)</span></span>
                </div>
            </div>
        </div>
    </div>`

    expect(parseChat(html)).to.deep.include.members([new Message('Biron', 'rolls', 'ooc', 'Stealth: 20', timestamp)])
  })

  it('should parse GM message', () => {
    const html = `
    <div class='message general you' data-messageid='-LiyoB1ePRmrDCSUjx8_'>
      <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
      They soon disappear into the night as well.
    </div>`

    const expected = new Message('GM', 'says', 'ic', 'They soon disappear into the night as well.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse orphaned player messages', () => {
    const html = `
    <div class="message general" data-messageid="-Lf1-_168kjBpovxY3nn">
      <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
      We're being followed.
    </div>`

    const expected = new Message('', 'says', 'ic', 'We\'re being followed.', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse unknown roll format without check field', () => {
    const html = `
    <div class="message rollresult player--MHI3xmxHclhV3xhCadC " data-messageid="-MIzW8pyy9kZ4s-IC0c0" data-playerid="-MHI3xmxHclhV3xhCadC">
      <span class='tstamp' aria-hidden='true'>July 04, 2019 9:36PM</span>
      <div class="spacer"></div>
      <div class="avatar" aria-hidden="true"></div>
      <span class="tstamp" aria-hidden="true">October 06, 2020 9:05PM</span>
      <span class="by">Flint:</span>
      <div class="formula" style="margin-bottom: 3px;">rolling 1d20+3</div>
      <div class="clear"></div>
      <div class="formula formattedformula">
      <div class="dicegrouping" data-groupindex="0">(<div data-origindex="0" class="diceroll d20"><div class="dicon"><div class="didroll">14</div><div class="backing"></div></div></div>)</div>+3<div class="clear"></div></div><div class="clear"></div><strong>=</strong><div class="rolled">17</div></div>
    `

    const expected = new Message('Flint', 'rolls', 'ooc', '17', timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })


  it('should not include numbers in character names', () => {
    const html = `
    <div class="message emote" data-messageid="-L90oOLL9svOKg_4w7Yi">
      Élise Valmont 5'10" and moving with the grace of a ballet dancer, Elise Valmont is hard to miss. She looks unhappy to be here, white-blonde hair framing her tanned face, a dagger hilt poking out of the sleeve of her leather armor before she adjusts it back into hiding and pulls her dark grey hooded cloak closed. Icy blue eyes scan the others present, observing silently.
    </div>`

    const expected = new Message(`Élise Valmont`, 'does', 'ic', `5'10\" and moving with the grace of a ballet dancer, Elise Valmont is hard to miss. She looks unhappy to be here, white-blonde hair framing her tanned face, a dagger hilt poking out of the sleeve of her leather armor before she adjusts it back into hiding and pulls her dark grey hooded cloak closed. Icy blue eyes scan the others present, observing silently.`, timestamp)
    expect(parseChat(html)).to.deep.include.members([expected])
  })

  it('should parse a partial action message', () => {
    const html = `
    <div class='message emote' data-messageid='-LiygrJkaQTP_Cmoi02m'>
        Biron grunts, 'nothin we need worry about'
    </div>`

    expect(parseChat(html)).to.deep.include.members([
      new Message('Biron', 'does', 'ic', 'grunts', timestamp),
      new Message('Biron', 'says', 'ic', 'nothin we need worry about', timestamp)
    ])
  })

  it('should parse a partial action message with odd quotes', () => {
    const html = `
    <div class='message emote' data-messageid='-LiyoLUXGCdZQktKVOyL'>
        <div class='avatar' aria-hidden='true'><img src='/users/avatar/1427024/30'></div>
        <div class='spacer'></div>Quinn looks to Biron ''anything of import?''
    </div>`

    expect(parseChat(html)).to.deep.include.members([
      new Message('Quinn', 'does', 'ic', 'looks to Biron', timestamp),
      new Message('Quinn', 'says', 'ic', 'anything of import?', timestamp)
    ])
  })

  it('should parse a partial action message with single quotes', () => {
    const html = `
    <div class='message emote' data-messageid='-Lf12oo2GiovZrIWyKUN'>
    <div class='avatar' aria-hidden='true'><img src='/users/avatar/1427024/30'></div>
    <div class='spacer'></div>Quinn Wheatsteal mutters 'ye ain't coming closer guv'nor'</div>`

    expect(parseChat(html)).to.deep.include.members([
      new Message('Quinn Wheatsteal', 'does', 'ic', 'mutters', timestamp),
      new Message('Quinn Wheatsteal', 'says', 'ic', `ye ain't coming closer guv'nor`, timestamp)
    ])
  })

  it('should parse a partial action message with nested quotes', () => {
    const html = `
    <div class='message emote' data-messageid='-LiykmSm7MV55nWmHnVF'>
    <div class='avatar' aria-hidden='true'><img src='/users/avatar/1427024/30'></div>
    <div class='spacer'></div>Quinn Wheatsteal scratches his head ''sounds a bit like 'the fisherman's daughter'. You know it? It's a bit of a bawdy song, and no mistake. You'd know the chorus - makes it clear that shes the easiest catch some...''</div>`

    expect(parseChat(html)).to.deep.include.members([
      new Message('Quinn Wheatsteal', 'does', 'ic', 'scratches his head', timestamp),
      new Message('Quinn Wheatsteal', 'says', 'ic', `sounds a bit like 'the fisherman's daughter'. You know it? It's a bit of a bawdy song, and no mistake. You'd know the chorus - makes it clear that shes the easiest catch some...`, timestamp)
    ])
  })

})
