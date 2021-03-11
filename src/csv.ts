import { Message, PlayerEvent, Roll } from './messages'

export const toCsv: (messages: Message[]) => string = (messages: Message[]) => {
  const header = 'kind,subkind,actor,message,action,result,check\n'

  return header +
    messages
      .map(renderMessage)
      .flat()
      .join('\n')
}

const renderMessage: (message: Message) => string[] = (message: Message) => {
  switch (message.kind) {
    case 'player': return [`${message.kind},,"${message.actor}"`].concat(message.events.map(renderEvent))
    case 'private': return [message.kind]
    case 'gm': return [message.kind].concat(message.events.map(renderEvent))
    case 'rolls': return [message.kind].concat(message.rolls.map(renderRoll))
  }
}

const renderEvent: (event: PlayerEvent) => string = (event: PlayerEvent) => {
  switch (event.kind) {
    case 'speech': return `,${event.kind},,"${event.message}"`
    case 'action': return `,${event.kind},,,"${event.message}"`
    case 'partial': return `,${event.kind},,"${event.message}","${event.action}"`
  }
}

const renderRoll: (roll: Roll) => string = (roll: Roll) => {
  if (roll.check !== undefined) {
    return `,roll,"${roll.actor}",,,${roll.result},"${roll.check}"`
  } else {
    return `,roll,"${roll.actor}",,,${roll.result}`
  }
}
