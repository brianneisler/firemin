import { append, pipe } from 'ramda'

import { TokenTypes } from '../../constants'

import parseCommaOperator from './parseCommaOperator'
import parseEntry from './parseEntry'
import parseWhitespaceAndComments from './parseWhitespaceAndComments'

const parseEntryAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseEntry,
  parseWhitespaceAndComments
)

const parseCommaEntryAndWhitespace = pipe(
  parseCommaOperator,
  parseEntryAndWhitespace
)

const parseEntries = (props) => {
  let { children, context, tokenList } = props
  let entries = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    nextToken.type !== TokenTypes.OPERATOR_CLOSE_CURLY_BRACE
  ) {
    let entry
    if (first) {
      first = false
      ;({ children, context, entry, tokenList } = parseEntryAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({ children, context, entry, tokenList } = parseCommaEntryAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    entries = append(entry, entries)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, entries, tokenList }
}

export default parseEntries
