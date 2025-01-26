import { Message } from './messages'
import * as cheerio from 'cheerio'
import * as moment from 'moment'

function readTimestamp (message: cheerio.Selector): Date | undefined {
  const text = message('.tstamp').text().trim()
  if (text !== '') {
    const timestamp = moment(text, 'MMMM DD, YYYY hh:mmaa')
    return timestamp.toDate()
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
      parseRollResult(message),
      readTimestamp(message)
    )
  } else {
    return new Message(
      message('.by').text().replace(/:$/, ''),
      'rolls',
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
  if ((actor && !actor.includes('GM')) || (!element.attribs.class.includes('you'))) return new Message(actor, 'says', speech, readTimestamp(message))
  /* eslint-enable */
  else return new Message('GM', 'says', speech, readTimestamp(message))
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

const parsePlayerAction: (message: cheerio.Selector, element: cheerio.Element) => Message = (message: cheerio.Selector, element: cheerio.Element) => {
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

  return new Message(
    name.join(' '),
    'does',
    action.join(' '),
    readTimestamp(message)
  )
}

const parseMessage: (element: cheerio.Element) => Message = (element: cheerio.Element) => {
  const message = cheerio.load(element)

  if (element.attribs.class.includes('private')) {
    return new Message('GM', 'says', '', new Date(0))
  } else if (element.attribs.class.includes('general') && message('.inlinerollresult').length > 0) {
    return parseRoll(message)
  } else if (element.attribs.class.includes('rollresult')) {
    return parseRoll(message)
  } else if (element.attribs.class.includes('general')) {
    return parseSpeech(message, element)
  } else if (element.attribs.class.includes('emote')) {
    return parsePlayerAction(message, element)
  } else {
    throw new Error(`Unrecognised message for classes=[${element.attribs.class}]: ${message.html()}`)
  }

}

export const parseChat: (html: string) => Message[] = (html: string) => {
  const $ = cheerio.load(html)
  return $('div.message').toArray().map(parseMessage)
}
