import { parseChat, parseOcc } from './parse'
import { shorten } from './shorten'
import { splitQuotes } from './split-quotes'
import { capitaliseMessages } from './capitalise'
import { punctuation } from './punctuation'
import { empty } from './empty'
import { toCsv } from './csv'
import { sort } from './sort'
import { flow } from 'fp-ts/lib/function'

export function convert (ooc: string): (html: string) => string {
  return flow(
    parseChat,
    parseOcc(ooc),
    sort,
    shorten,
    splitQuotes,
    capitaliseMessages,
    punctuation,
    empty,
    toCsv
  )
}
