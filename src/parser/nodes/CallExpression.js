import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createCallExpression from '../pipes/createCallExpression'
import identifyArgs from '../pipes/identifyArgs'
import identifyCallee from '../pipes/identifyCallee'
import parseArgs from '../pipes/parseArgs'
import parseCallee from '../pipes/parseCallee'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseCallExpressionTokens = pipe(
  parseCallee,
  parseWhitespaceAndComments,
  parseArgs,
  createCallExpression
)

const identifyCallExpressionChildren = pipe(
  identifyCallee,
  skipWhitespaceAndComments,
  identifyArgs
)

const CallExpression = {
  identify: (context, node) =>
    createCallExpression({
      ...identifyCallExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.CALL_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseCallExpressionTokens({
      children: [],
      context,
      prevExpression,
      tokenList
    }),

  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      const identifierToken = findNextRealToken(tokenList)
      if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return (
      operatorToken &&
      operatorToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
    )
  },
  type: ParserTypes.EXPRESSION
}

export default CallExpression
