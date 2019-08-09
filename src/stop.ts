import { Message, PlayerMessage, PlayerEvent, Action, Speech, PartialAction } from './messages'

const appendFullStop: (s: string) => string = (s: string) => {
  if (s.charAt(s.length - 1).match(/[A-za-z]/) != null) {
    return s + '.'
  } else return s
}

const fullStopEvent: (event: PlayerEvent) => PlayerEvent = (event: PlayerEvent) => {
  switch(event.kind) {
    case 'action': return new Action(appendFullStop(event.message))
    case 'speech': return new Speech(appendFullStop(event.message))
    case 'partial': return new PartialAction(event.action, appendFullStop(event.message))
  }
}

const fullStopMessage: (message: Message) => Message = (message: Message) => {
  switch(message.kind) {
    case 'player': return new PlayerMessage(message.actor, message.events.map(fullStopEvent))
    default: return message
  }
}

export const stop: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(fullStopMessage)
