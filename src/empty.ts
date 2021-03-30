import { Message, PlayerMessage, GameMasterMessage, PlayerEvent, Rolls, Roll } from './messages'

const emptyMessage: (event: PlayerEvent) => boolean = (event: PlayerEvent) =>
  (event.message !== undefined && event.message.trim() !== '')

const emptyRoll: (roll: Roll) => boolean = (roll: Roll) =>
  (roll.actor !== undefined && roll.check !== undefined && roll.actor.trim() !== '' && roll.check.trim() !== '')

export const empty: (messages: Message[]) => Message[] = (messages: Message[]) => {
  const filtered = messages.map(message => {
    switch (message.kind) {
      case 'player': return new PlayerMessage(message.actor, message.events.filter(emptyMessage))
      case 'gm': return new GameMasterMessage(message.events.filter(emptyMessage))
      case 'rolls': return new Rolls(message.rolls.filter(emptyRoll))
      default: return message
    }
  })

  return filtered.filter(message => {
    switch (message.kind) {
      case 'player':
      case 'gm': return message.events.length !== 0
      case 'rolls': return message.rolls.length !== 0
      default: return true
    }
  })
}
