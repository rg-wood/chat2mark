import { Message, PlayerMessage, PlayerEvent, Action, Speech } from './messages'

function flatten<T> (arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays)
}

const quotes = /^(.*)("|'')(.*)("|'')(.*)$/

const splitQuotesForAction: (action: Action) => PlayerEvent[] = (action: Action) => {
  const match = action.message.match(quotes)
  if (match != null) {
    return [
      new Action(match[1].trim()),
      new Speech(match[3].trim())
    ]
  } else return [action]
}

const splitQuotesForEvent: (event: PlayerEvent) => PlayerEvent[] = (event: PlayerEvent) => {
  switch (event.kind) {
    case 'action': return splitQuotesForAction(event)
    default: return [event]
  }
}

const splitQuotesForPlayerMessage: (message: PlayerMessage) => PlayerMessage = (message: PlayerMessage) =>
  new PlayerMessage(message.actor, flatten(message.events.map(splitQuotesForEvent)))

export const splitQuotes: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map((message) => {
    switch (message.kind) {
      case 'player': return splitQuotesForPlayerMessage(message)
      default: return message
    }
  })
