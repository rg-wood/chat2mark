import { Message } from './messages'
import * as parse from 'csv-parse/lib/es5/sync'
// import { groupAdjacent } from './group-adjacent'

export const toCsv: (messages: Message[]) => string = (messages: Message[]) => {
  const header = 'timestamp,actor,type,chat,message\n'

  return header +
    messages
      .map(renderMessage)
      .join('\n')
}

const renderMessage: (message: Message) => string = (message: Message) => {
  return `"${message.timestamp !== undefined ? message.timestamp.toUTCString() : ''}","${message.actor}",${message.type},${message.chat},"${message.message}"`
}

interface OocMessage {
  Author?: string
  Date?: string
  Content?: string
  message?: string
  action?: string
  result?: string
  check?: string
}

export function fromOocCsv (csv: string): Message[] {
  const records =
    parse(csv, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true
    }) as [OocMessage]

  return records.map((record) => {
    if (record.Author !== undefined && record.Content !== undefined && record.Date !== undefined) {
      return new Message(record.Author, 'says', 'ooc', record.Content, new Date(Date.parse(record.Date)))
    }
  })
    .filter((message): message is Message => message !== undefined)
}
