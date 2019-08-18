import { Message, PlayerMessage, PlayerEvent } from './messages'

const emptyMessage: (event: PlayerEvent) => boolean = (event: PlayerEvent) =>
  (event.message !== undefined && event.message.trim() !== '')

export const empty: (messages: Message[]) => Message[] = (messages: Message[]) => {
  const filtered = messages.map(message => {
    switch(message.kind) {
      case "player": return new PlayerMessage(message.actor, message.events.filter(emptyMessage))
      default: return message
    }
  })

  return filtered.filter(message => {
    switch(message.kind) {
      case "player": return message.events.length !== 0
      default: return true
    }
  })
}
