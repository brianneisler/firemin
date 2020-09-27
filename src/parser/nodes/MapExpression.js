import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createMapExpression from '../pipes/createMapExpression'
import expectCloseCurlyBraceOperator from '../pipes/expectCloseCurlyBraceOperator'
import expectOpenCurlyBraceOperator from '../pipes/expectOpenCurlyBraceOperator'
import identifyEntries from '../pipes/identifyEntries'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseEntries from '../pipes/parseEntries'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseMapExpressionTokens = pipe(
  parseOpenCurlyBraceOperator,
  parseWhitespaceAndComments,
  parseEntries,
  parseWhitespaceAndComments,
  parseCloseCurlyBraceOperator,
  createMapExpression
)

const identifyMapExpressionChildren = pipe(
  expectOpenCurlyBraceOperator,
  skipWhitespaceAndComments,
  identifyEntries,
  skipWhitespaceAndComments,
  expectCloseCurlyBraceOperator
)

const MapExpression = {
  identify: (context, node) =>
    createMapExpression({
      ...identifyMapExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.MAP_EXPRESSION,
  parse: (context, tokenList) =>
    parseMapExpressionTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      return false
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList)
    )
    return (
      operatorToken &&
      operatorToken.type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
    )
  },
  type: ParserTypes.EXPRESSION
}

export default MapExpression
