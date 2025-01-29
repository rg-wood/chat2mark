import { Message, MessageFilter } from './messages'

function flatten<T> (arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays)
}

const quotes = /^(.*)("|'')(.*)("|'')(.*)$/

const splitQuotesForAction: (action: Message) => Message[] = (action: Message) => {
  const match = action.message.match(quotes)
  if (match != null) {
    const partialAction: Message = { ...action, message: match[1].trim() }
    const speech: Message = { ...action, type: 'says', message: match[3].trim() }

    return [partialAction, speech]
  } else return [action]
}

export const splitQuotes: MessageFilter = (messages: Message[]) =>
  flatten(
    messages.map((message) => {
      switch (message.type) {
        case 'does': return splitQuotesForAction(message)
        default: return [message]
      }
    })
  )
