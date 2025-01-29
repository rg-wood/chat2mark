import { Message, MessageFilter } from './messages'

function byTimeStamp (a: Message, b: Message): number {
  if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp < b.timestamp) return -1
  else if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp > b.timestamp) return 1
  else if (a.timestamp !== undefined && b.timestamp !== undefined && a.timestamp === b.timestamp) return 0
  else if (a.timestamp === undefined && b.timestamp !== undefined) return -1
  else if (a.timestamp !== undefined && b.timestamp === undefined) return 1
  else return 0
}

export const sort: MessageFilter = (messages: Message[]) => {
  return messages.sort(byTimeStamp)
}
