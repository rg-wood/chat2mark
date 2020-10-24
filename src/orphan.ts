import { Message, PlayerMessage, PlayerEvent } from './messages'
import { groupAdjacent } from './group-adjacent'

function flatten<T> (arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays)
}

const flattenOrphans: (messages: Message[]) => Message = (messages: Message[]) => {
  const baseMessage: Message = messages[0]
  if (messages.length === 1) return baseMessage
  else if (baseMessage.kind === 'player') {
    const events: PlayerEvent[][] =
      messages
        .filter((m: Message): m is PlayerMessage => m.kind === 'player')
        .map(m => m.events)

    return new PlayerMessage(baseMessage.actor, flatten(events))
  } else return baseMessage
}

const isOrphaned: (pre: Message, cur: Message) => boolean = (pre: Message, cur: Message) =>
  pre.kind === 'player' && cur.kind === 'player' && cur.actor.trim() === ''

export const orphan: (messages: Message[]) => Message[] = (messages: Message[]) =>
  groupAdjacent(messages, isOrphaned).map(flattenOrphans)
