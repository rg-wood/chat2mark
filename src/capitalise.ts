import { Message } from './messages'

const capitalise: (s: string) => string = (s: string) =>
  s.charAt(0).toUpperCase().concat(s.slice(1))

const lowercase: (s: string) => string = (s: string) =>
  s.charAt(0).toLowerCase().concat(s.slice(1))

const capitaliseMessage: (message: Message) => Message = (message: Message) => {
  switch (message.type) {
    case 'does': return { ...message, message: lowercase(message.message) }
    case 'says': return { ...message, message: capitalise(message.message) }
    case 'rolls': return { ...message, message: capitalise(message.message) }
  }
}

export const capitaliseMessages: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(capitaliseMessage)
