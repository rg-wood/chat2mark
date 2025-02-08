import { Message, MessageFilter } from './messages'
import { flatten } from './flatten'

function splitLine (message: Message): Message[] {
  return message
    .message
    .split(/\r?\n|\r|\n/g)
    .filter(line => line !== '')
    .map(line => new Message(message.actor, message.type, message.chat, line, message.timestamp))
}

export const multiline: MessageFilter = (messages: Message[]) =>
  flatten(messages.map(splitLine))
