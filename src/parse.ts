import { Message, MessageFilter } from './messages'
import * as cheerio from 'cheerio'
import * as moment from 'moment'
import { fromOocCsv } from './csv'
import * as fs from 'fs'
import { flatten } from './flatten'

let lastTimeStamp: Date | undefined

function readTimestamp (message: cheerio.Selector): Date | undefined {
  const text = message('.tstamp').text().trim()
  if (text !== '') {
    const timestamp = moment(text, 'MMMM DD, YYYY hh:mmaa')
    lastTimeStamp = timestamp.toDate()
    return lastTimeStamp
  } else {
    return lastTimeStamp
  }
}

const capitalize: (s: string) => string = (s: string) =>
  s.charAt(0).toUpperCase().concat(s.slice(1).toLowerCase())

const parseRollResult: (message: cheerio.Selector) => string = (message: cheerio.Selector) => {
  if (message('.inlinerollresult').length > 0) {
    return message('.inlinerollresult').slice(0, 1).text()
  } else {
    return message('.rolled').slice(0, 1).text()
  }
}

const parseRoll: (message: cheerio.Selector) => Message = (message: cheerio.Selector) => {
  const check = message('.sheet-label').text().trim().split(' ')[0]

  if (check === '') {
    return new Message(
      message('.by').text().replace(/:$/, ''),
      'rolls',
      'ooc',
      parseRollResult(message),
      readTimestamp(message)
    )
  } else {
    return new Message(
      message('.by').text().replace(/:$/, ''),
      'rolls',
      'ooc',
      `${capitalize(check)}: ${parseRollResult(message)}`,
      readTimestamp(message)
    )
  }
}

const parseSpeech: (message: cheerio.Selector, element: cheerio.Element) => Message = (message: cheerio.Selector, element: cheerio.Element) => {
  const actor = message('.by').text().replace(/:$/, '')

  const speech =
    element
      .children
      .filter((c) => c.type === 'text')
      .map((c) => c.data)
      .join(' ')
      .trim()

  /* eslint-disable */
  if ((actor && !actor.includes('GM')) || (!element.attribs.class.includes('you'))) return new Message(actor, 'says', 'ic', speech, readTimestamp(message))
  /* eslint-enable */
  else return new Message('GM', 'says', 'ic', speech, readTimestamp(message))
}

const nonCapitalisedWord = /^[a-z0-9]/

const firstNonCapitalisedWord: (word: string) => boolean = (word: string) => word.match(nonCapitalisedWord) !== null

const indexOfName: (words: string[]) => number = (words: string[]) => {
  if (words[0] === 'The') {
    return 2
  } else {
    return words.findIndex(firstNonCapitalisedWord)
  }
}

function getName (words: string[]): string[] {
  return words.slice(0, indexOfName(words))
}

function getAction (words: string[]): string[] {
  return words.slice(indexOfName(words), words.length)
}

const parsePlayerAction: (message: cheerio.Selector, element: cheerio.Element) => Message = (message: cheerio.Selector, element: cheerio.Element) => {
  const words = element
    .children
    .filter((c) => c.type === 'text')
    .map((c) => c.data)
    .join(' ')
    .trim()
    .split(' ')

  const name = getName(words)
  const action = getAction(words)

  return new Message(
    name.join(' '),
    'does',
    'ic',
    action.join(' '),
    readTimestamp(message)
  )
}

const partialAction = /^([^,]*),? ("|')(.*)\2$/

const parseAction: (message: cheerio.Selector, element: cheerio.Element) => Message[] = (message: cheerio.Selector, element: cheerio.Element) => {
  const action = element
    .children
    .filter((c) => c.type === 'text')
    .map((c) => c.data)
    .join(' ')
    .trim()

  const match = action.replace(/''/g, '"').match(partialAction)

  if (match != null) {
    const words = match[1].split(' ')
    const name = getName(words).join(' ')

    const actionMessage =
      new Message(
        name,
        'does',
        'ic',
        getAction(words).join(' '),
        readTimestamp(message)
      )
    return [
      actionMessage,
      new Message(name, 'says', 'ic', match[3], readTimestamp(message))
    ]
  } else {
    return [parsePlayerAction(message, element)]
  }
}

const parseMessage: (element: cheerio.Element) => Message[] = (element: cheerio.Element) => {
  const message = cheerio.load(element)

  if (element.attribs.class.includes('private')) {
    return [new Message('GM', 'says', 'ic', '', new Date(0))]
  } else if (element.attribs.class.includes('general') && message('.inlinerollresult').length > 0) {
    return [parseRoll(message)]
  } else if (element.attribs.class.includes('rollresult')) {
    return [parseRoll(message)]
  } else if (element.attribs.class.includes('general')) {
    return [parseSpeech(message, element)]
  } else if (element.attribs.class.includes('emote')) {
    return parseAction(message, element)
  } else {
    throw new Error(`Unrecognised message for classes=[${element.attribs.class}]: ${message.html()}`)
  }

}

export const parseChat: (html: string) => Message[] = (html: string) => {
  const $ = cheerio.load(html)
  return flatten($('div.message').toArray().map(parseMessage))
}

export const parseOcc: (file: string) => MessageFilter = (file: string) => {
  const csv = fs.readFileSync(file, { encoding: 'utf8' })
  const chat = fromOocCsv(csv)
  return (messages: Message[]) => {
    return messages.concat(chat)
  }
}
