import { Message, MessageFilter } from './messages'

const shortenedNames: { [character: string]: string } = {
  'Quinn Wheatsteal': 'Quinn',
  'Sergeant Agata': 'Agata',
  'Corporal Loth': 'Loth',
  'Ba\' Raknul': 'Ba\'Raknul',
  'Ric (GM)': 'GM'
}

export const shorten: MessageFilter = (messages: Message[]) =>
  messages
    .map((message) => {
      const shortened: Message = {
        ...message,
        actor: shortenedNames[message.actor] !== undefined ? shortenedNames[message.actor] : message.actor
      }
      return shortened
    })
