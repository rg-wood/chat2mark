import { Message } from './messages'
export const punctuation: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(stripSurroundingMarks).map(fullStopMessage)

const stripSurroundingMarks: (message: Message) => Message = (message: Message) => {
  return { ...message, message: deleteSurroundingMarks(message.message) }
}

const deleteSurroundingMarks: (s: string) => string = (s: string) => {
  const match = s.match(/^"(.*)"$/)
  if (match != null) return match[1]
  else return s
}

const fullStopMessage: (message: Message) => Message = (message: Message) => {
  return { ...message, message: appendFullStop(message.message) }
}

const appendFullStop: (s: string) => string = (s: string) => {
  if (s.charAt(s.length - 1).match(/[A-za-z]/) != null) {
    return s + '.'
  } else return s
}
