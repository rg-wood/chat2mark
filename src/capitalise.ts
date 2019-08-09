import { Message, PlayerMessage, PlayerEvent, Action, Speech, PartialAction } from './messages'

const capitalise: (s: string) => string = (s: string) =>
  s.charAt(0).toUpperCase().concat(s.slice(1))

const lowercase: (s: string) => string = (s: string) =>
  s.charAt(0).toLowerCase().concat(s.slice(1))

const capitaliseEvent: (event: PlayerEvent) => PlayerEvent = (event: PlayerEvent) => {
  switch(event.kind) {
    case 'action': return event
    case 'speech': return new Speech(capitalise(event.message))
    case 'partial': return new PartialAction(lowercase(event.action), capitalise(event.message))
  }
}

const capitaliseMessage: (message: Message) => Message = (message: Message) => {
  switch(message.kind) {
    case 'player': return new PlayerMessage(message.actor, message.events.map(capitaliseEvent))
    default: return message
  }
}

export const capitaliseMessages: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(capitaliseMessage)
