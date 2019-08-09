import { Message, PlayerMessage, PlayerEvent, GameMasterMessage, Speech } from './messages'
import { groupAdjacent } from './group-adjacent'
import { flow } from 'fp-ts/lib/function'

const flattenPlayerMessage: (messages: Message[]) => Message = (messages: Message[]) => {
  const baseMessage: Message = messages[0]
  if (messages.length == 1) return baseMessage
  else if (baseMessage.kind  === "player") {
    const events: PlayerEvent[] =
      messages
        .filter((m: Message): m is PlayerMessage => m.kind === "player")
        .map(m => m.events[0])

    return new PlayerMessage(baseMessage.actor, events)
  } else return baseMessage
}

const flattenGmMessage: (messages: Message[]) => Message = (messages: Message[]) => {
  const baseMessage: Message = messages[0]
  if (messages.length == 1) return baseMessage
  else if (baseMessage.kind  === "gm") {
    const events: Speech[] =
      messages
        .filter((m: Message): m is GameMasterMessage => m.kind === "gm")
        .map(m => m.events[0])

    return new GameMasterMessage(events)
  } else return baseMessage
}

const consecutiveSameActors: (pre: Message, cur: Message) => boolean = (pre: Message, cur: Message) =>
  pre.kind === "player" && cur.kind === "player" && pre.actor === cur.actor

const collectPlayerMessages: (messages: Message[]) => Message[] = (messages: Message[]) =>
  groupAdjacent(messages, consecutiveSameActors).map(flattenPlayerMessage)

const consecutiveGmMessages: (pre: Message, cur: Message) => boolean = (pre: Message, cur: Message) =>
  pre.kind === "gm" && cur.kind === "gm"

const collectGmMessages: (messages: Message[]) => Message[] = (messages: Message[]) =>
  groupAdjacent(messages, consecutiveGmMessages).map(flattenGmMessage)

export const collect: (messages: Message[]) => Message[] =
  flow(collectPlayerMessages, collectGmMessages)
