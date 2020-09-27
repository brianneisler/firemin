import { append, head, length, pipe } from 'ramda'

import CloseCurlyBraceOperator from '../nodes/CloseCurlyBraceOperator'

import expectCommaOperator from './expectCommaOperator'
import identifyEntry from './identifyEntry'
import skipWhitespaceAndComments from './skipWhitespaceAndComments'

const identifyEntryAndWhitespace = pipe(
  skipWhitespaceAndComments,
  identifyEntry,
  skipWhitespaceAndComments
)

const identifyCommaEntryAndWhitespace = pipe(
  expectCommaOperator,
  identifyEntryAndWhitespace
)

const identifyEntries = (props) => {
  let { children, context } = props
  let entries = []
  let first = true
  let nextChild = head(children)
  while (length(children) > 0 && !CloseCurlyBraceOperator.is(nextChild)) {
    let entry
    if (first) {
      first = false
      ;({ children, context, entry } = identifyEntryAndWhitespace({
        children,
        context
      }))
    } else {
      ;({ children, context, entry } = identifyCommaEntryAndWhitespace({
        children,
        context
      }))
    }
    entries = append(entry, entries)
    nextChild = head(children)
  }
  return { ...props, children, context, entries }
}

export default identifyEntries
