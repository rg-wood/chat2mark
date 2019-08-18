import { Message, PlayerMessage, Action, Speech, PartialAction, Rolls, Roll, Private, GameMasterMessage } from './messages'
import * as cheerio from 'cheerio'

const capitalize: (s: string) => string = (s: string) =>
  s.charAt(0).toUpperCase().concat(s.slice(1).toLowerCase())

const parseRoll: (message: CheerioSelector) => Rolls = (message: CheerioSelector) =>
  new Rolls([
    new Roll(
      message('.by').text().replace(/:$/, ''),
      parseInt(message('.inlinerollresult').slice(0, 1).text()),
      capitalize(message('.sheet-label').text().trim().split(' ')[0])
    )
  ])

const parseSpeech: (message: CheerioSelector, element: CheerioElement) => PlayerMessage | GameMasterMessage = (message: CheerioSelector, element: CheerioElement) => {
  const actor = message('.by').text().replace(/:$/, '')

  const speech =
    element
      .children
      .filter((c) => c.type === 'text')
      .map((c) => c.data)
      .join(' ')
      .trim()

  if ((actor && !actor.includes('GM')) || !element.attribs['class'].includes('you')) return new PlayerMessage(actor, [new Speech(speech)])
  else return new GameMasterMessage([new Speech(speech)])
}

const nonCapitalisedWord = /^[a-z]/

const firstNonCapitalisedWord: (word: string) => boolean = (word: string) => word.match(nonCapitalisedWord) !== null

const indexOfName: (words: string[]) => number = (words: string[]) => {
  if (words[0] === 'The') {
    return 2
  } else {
    return words.findIndex(firstNonCapitalisedWord)
  }
}

const partialAction = /^([^,]*),? ("|')(.*)\2$/

const parseAction: (action: string) => Action | PartialAction = (action: string) => {
  const match = action.replace(/''/g, `"`).match(partialAction)
  if (match != null) {
    return new PartialAction(match[1], match[3])
  } else {
    return new Action(action)
  }
}

const parsePlayerAction: (message: CheerioSelector, element: CheerioElement) => PlayerMessage = (message: CheerioSelector, element: CheerioElement) => {
  const words = element
    .children
    .filter((c) => c.type === 'text')
    .map((c) => c.data)
    .join(' ')
    .trim()
    .split(' ')

  const i = indexOfName(words)

  const name = words.slice(0, i)
  const action = words.slice(i, words.length)

  return new PlayerMessage(
    name.join(' '),
    [parseAction(action.join(' '))]
  )
}

const parseMessage: (element: CheerioElement) => Message = (element: CheerioElement) => {
  const message = cheerio.load(element)

  if (element.attribs.class.includes('general') && message('.inlinerollresult').length > 0) {
    return parseRoll(message)
  } else if (element.attribs.class.includes('general')) {
    return parseSpeech(message, element)
  } else if (element.attribs.class.includes('emote')) {
    return parsePlayerAction(message, element)
  } else if (element.attribs.class.includes('private')) {
    return new Private()
  } else {
    throw new Error(`Unrecognised message: ${message.html()}`)
  }

}

export const parseChat: (html: string) => Message[] = (html: string) => {
  const $ = cheerio.load(html)
  return $('div.message').toArray().map(parseMessage)
}
