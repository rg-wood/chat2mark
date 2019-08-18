import { parseChat } from './parse'
import { collect } from './collect'
import { shorten } from './shorten'
import { splitQuotes } from './split-quotes'
import { capitaliseMessages } from './capitalise'
import { stop } from './stop'
import { empty } from './empty'
import { orphan } from './orphan'
import { toMarkdown } from './markdown'
import { flow } from 'fp-ts/lib/function'

export const convert: (html: string) => string = flow(
  parseChat,
  shorten,
  collect,
  splitQuotes,
  capitaliseMessages,
  stop,
  orphan,
  empty,
  toMarkdown
)
