import { Message, MessageFilter } from './messages'

function flatten<T> (arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays)
}

const quotes = /^(.*)("|'')(.*)("|'')(.*)$/

const splitQuotesForAction: MessageFilter = (action: Message) => {
  const match = action.message.match(quotes)
  if (match != null) {
    return [
      { ...action, message: match[1].trim() },
      { ...action, type: 'says', message: match[3].trim() }
    ]
  } else return [action]
}

export const splitQuotes: MessageFilter = (message: Message) => {
  switch(message.type) {
    case 'does': splitQuotesForAction(message)
    default: return [message]
  }
}
