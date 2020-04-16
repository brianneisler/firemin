import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex } from '../util'
import { v4 as uuidv4 } from 'uuid'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseCommaOperator from '../pipes/parseCommaOperator'
import parseEntry from '../pipes/parseEntry'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseEntryAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseEntry,
  parseWhitespaceAndComments
)

const parseCommaEntryAndWhitespace = pipe(parseCommaOperator, parseEntryAndWhitespace)

const parseEntries = (props) => {
  let { children, context, tokenList } = props
  let entries = []
  let first = true
  let nextToken = tokenList.get(0)
  while (tokenList.size > 0 && nextToken.type !== TokenTypes.OPERATOR_CLOSE_CURLY_BRACE) {
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

const createMapExpression = pipe(
  parseOpenCurlyBraceOperator,
  parseWhitespaceAndComments,
  parseEntries,
  parseWhitespaceAndComments,
  parseCloseCurlyBraceOperator,
  ({ children, entries }) => ({
    children,
    entries,
    id: uuidv4(),
    type: NodeTypes.MAP_EXPRESSION
  })
)

const MapExpression = {
  parse: (context, tokenList) => createMapExpression({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      return false
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList))
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
  },
  type: ParserTypes.EXPRESSION
}

export default MapExpression
