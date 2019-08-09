import { Message, PlayerMessage } from './messages'

const shortenedNames: { [character: string]: string } = {
  "Quinn Wheatsteal": "Quinn",
  "Sergeant Agata": "Agata",
  "Corporal Loth": "Loth",
  "Ric (GM)": "GM"
}

const shortenName: (message: PlayerMessage) => PlayerMessage = (message: PlayerMessage) =>
  new PlayerMessage(
    shortenedNames[message.actor] || message.actor,
    message.events
  )

const shortenNames: (message: Message) => Message = (message: Message) => {
  switch(message.kind) {
    case "player": return shortenName(message);
    default: return message
  }
}

export const shorten: (messages: Message[]) => Message[] = (messages: Message[]) =>
  messages.map(shortenNames)
