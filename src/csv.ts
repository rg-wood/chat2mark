import { Message } from './messages'
import * as parse from 'csv-parse/lib/es5/sync'
import { groupAdjacent } from './group-adjacent'

export const toCsv: (messages: Message[]) => string = (messages: Message[]) => {
  const header = 'actor,type,message\n'

  return header +
    messages
      .map(renderMessage)
      .join('\n')
}

const renderMessage: (message: Message) => string = (message: Message) => {
  return `"${message.actor}",${message.type},"${message.message}"`
}

// interface Record {
//   kind?: string
//   subkind?: string
//   actor?: string
//   message?: string
//   action?: string
//   result?: string
//   check?: string
// }

// export const parseCsv: (csv: string) => Message[] = (csv: string) => {
//   const records =
//     parse(csv, {
//       columns: true,
//       skip_empty_lines: true,
//       relax_column_count: true
//     }) as [Record]

//   console.log(groupAdjacent(records, messageRecords))

//   return groupAdjacent(records, messageRecords)
//     .map(parseMessage)
// }

// const messageRecords: (pre: Record, cur: Record) => boolean = (pre: Record, cur: Record) =>
//   (pre.kind !== '' && cur.kind === '') || (pre.kind === '' && cur.kind === '')

// const parseMessage: (group: [Record]) => Message = (group: [Record]) => {
//   const message = group[0]

//   switch (message.kind) {
//     case 'player': return parsePlayerMessage(group)
//     case 'rolls': return parseRolls(group)
//     case 'gm': return parseGameMasterMessage(group)
//     case 'private': return new Private()
//     default: throw new Error(`unknown message type=${message.kind}`)
//   }
// }

// const parsePlayerMessage: (group: [Record]) => ActorMessage = (group: [Record]) => {
//   const [message, ...events] = group

//   if (message.actor !== undefined) return new ActorMessage(message.actor, events.map(parseEvents))
//   else throw new Error('corrupt message')
// }

// const parseEvents: (event: Record) => PlayerEvent = (event: Record) => {
//   switch (event.subkind) {
//     case 'speech': return parseSpeech(event)
//     case 'action': return parseAction(event)
//     case 'partial': return parsePartial(event)
//     default: throw new Error(`unknown event type=${event.subkind}`)
//   }
// }

// const parseSpeech: (event: Record) => Speech = (event: Record) => {
//   if (event.message !== undefined) return new Speech(event.message)
//   else throw new Error('corrupt message')
// }

// const parseAction: (event: Record) => Action = (event: Record) => {
//   if (event.action !== undefined) return new Action(event.action)
//   else throw new Error('corrupt message')
// }

// const parsePartial: (event: Record) => PartialAction = (event: Record) => {
//   if (
//     event.action !== undefined &&
//     event.message !== undefined
//   ) return new PartialAction(event.action, event.message)
//   else throw new Error('corrupt message')
// }

// const parseGameMasterMessage: (group: [Record]) => GameMasterMessage = (group: [Record]) => {
//   const events = group.slice(1)
//   return new GameMasterMessage(events.map(parseSpeech))
// }

// const parseRolls: (group: [Record]) => Rolls = (group: [Record]) => {
//   const events = group.slice(1)
//   return new Rolls(events.map(parseRoll))
// }

// const parseRoll: (event: Record) => Roll = (event: Record) => {
//   if (
//     event.actor !== undefined &&
//     event.result !== undefined
//   ) return new Roll(event.actor, parseInt(event.result), event.check)
//   else throw new Error('corrupt message')
// }
