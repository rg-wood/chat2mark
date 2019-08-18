import { collect } from '../src/collect'
import { PlayerMessage, GameMasterMessage, Action, Speech, Rolls, Roll, Private } from '../src/messages'
import * as chai from 'chai'

const expect = chai.expect

describe('collect()', () => {

  it('should collect messages from the same character', () => {
    const messages = [
      new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')]),
      new PlayerMessage('Orin', [new Action('picks up and apple and starts eating it.')])
    ]

    const expected =
      new PlayerMessage(
        'Orin',
        [
          new Speech('You do have an awful lot of stories.'),
          new Action('picks up and apple and starts eating it.')
        ]
      )

    expect(collect(messages)).to.deep.equals([expected])
  })

  it('should not collect messages from the different characters', () => {
    const messages = [
      new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')]),
      new PlayerMessage('Biron', [new Action('picks up and apple and starts eating it.')])
    ]

    expect(collect(messages)).to.deep.equals(messages)
  })

  it('should only collect messages from the same character if they are adjacent', () => {
    const messages = [
      new PlayerMessage('Orin', [new Speech('You do have an awful lot of stories.')]),
      new PlayerMessage('Orin', [new Action('picks up and apple and starts eating it.')]),
      new PlayerMessage('Biron', [new Action('watches in disgust.')]),
      new PlayerMessage('Orin', [new Action('smiles, mouth full of apple.')])
    ]

    const expected =
      new PlayerMessage(
        'Orin',
        [
          new Speech('You do have an awful lot of stories.'),
          new Action('picks up and apple and starts eating it.')
        ]
      )

    expect(collect(messages)).to.deep.include.members([expected])
  })

  it('should collect GM messages', () => {
    const messages = [
      new GameMasterMessage([new Speech('You do have an awful lot of stories.')]),
      new GameMasterMessage([new Speech('picks up and apple and starts eating it.')])
    ]

    const expected =
      new GameMasterMessage(
        [
          new Speech('You do have an awful lot of stories.'),
          new Speech('picks up and apple and starts eating it.')
        ]
      )

    expect(collect(messages)).to.deep.equals([expected])
  })

  it('should collect rolls', () => {
    const messages = [
      new Rolls([new Roll('Quinn', 10, 'Initiative')]),
      new Rolls([new Roll('Orin', 15, 'Perception')])
    ]

    const expected =
      new Rolls([
        new Roll('Quinn', 10, 'Initiative'),
        new Roll('Orin', 15, 'Perception')
      ])

    expect(collect(messages)).to.deep.equals([expected])
  })

})
