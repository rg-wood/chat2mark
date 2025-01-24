import { Message } from './messages'
export const punctuation: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(stripSurroundingMarks).map(fullStopMessage)

const stripSurroundingMarks: (message: Message) => Message = (message: Message) => {
  switch (message.kind) {
    case 'player': return new PlayerMessage(message.actor, message.events.map(stripSurroundingEvent))
    default: return message
  }
}

const stripSurroundingEvent: (event: Message) => Message = (message: Message) => {
  switch (event.kind) {
    case 'action': return new Action(deleteSurroundingMarks(event.message))
    case 'speech': return new Speech(deleteSurroundingMarks(event.message))
    case 'partial': return new PartialAction(event.action, deleteSurroundingMarks(event.message))
  }
}

const deleteSurroundingMarks: (s: string) => string = (s: string) => {
  const match = s.match(/^"(.*)"$/)
  if (match != null) return match[1]
  else return s
}

const fullStopMessage: (message: Message) => Message = (message: Message) => {
  switch (message.kind) {
    case 'player': return new Message(message.actor, message.events.map(fullStopEvent))
    default: return message
  }
}

const appendFullStop: (s: string) => string = (s: string) => {
  if (s.charAt(s.length - 1).match(/[A-za-z]/) != null) {
    return s + '.'
  } else return s
}
