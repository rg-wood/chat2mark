import { Message, MessageFilter } from './messages'

const emptyMessage: (event: Message) => boolean = (event: Message) =>
  (event.message !== undefined && event.message.trim() !== '')

const emptyRoll: (roll: Message) => boolean = (roll: Message) =>
  (roll.actor !== undefined && roll.message !== undefined && roll.actor.trim() !== '' && roll.message.trim() !== '')

export const empty: MessageFilter = (messages: Message[]) =>
  messages
    .filter((message) => {
      switch (message.type) {
        case 'rolls': return emptyRoll(message)
        default: return emptyMessage(message)
      }
    })
