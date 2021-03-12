import { parseChat } from './parse'
import { collect } from './collect'
import { shorten } from './shorten'
import { splitQuotes } from './split-quotes'
import { capitaliseMessages } from './capitalise'
import { punctuation } from './punctuation'
import { empty } from './empty'
import { orphan } from './orphan'
import { toMarkdown } from './markdown'
import { toCsv, parseCsv } from './csv'
import { flow } from 'fp-ts/lib/function'

export const convert: (html: string) => string = flow(
  parseChat,
  shorten,
  collect,
  splitQuotes,
  capitaliseMessages,
  punctuation,
  orphan,
  empty,
  toMarkdown
)

export const preprocess: (html: string) => string = flow(
  parseChat,
  shorten,
  collect,
  splitQuotes,
  capitaliseMessages,
  punctuation,
  orphan,
  empty,
  toCsv
)

export const postprocess: (csv: string) => string = flow(
  parseCsv,
  toMarkdown
)
