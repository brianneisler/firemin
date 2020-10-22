import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createParenthesesExpression from '../pipes/createParenthesesExpression'
import expectCloseParenthesisOperator from '../pipes/expectCloseParenthesisOperator'
import expectOpenParenthesisOperator from '../pipes/expectOpenParenthesisOperator'
import identifyExpression from '../pipes/identifyExpression'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseExpression from '../pipes/parseExpression'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseParenthesesExpressionTokens = pipe(
  parseOpenParenthesisOperator,
  parseWhitespaceAndComments,
  parseExpression,
  parseWhitespaceAndComments,
  parseCloseParenthesisOperator,
  createParenthesesExpression
)

const identifyParenthesesExpressionChildren = pipe(
  expectOpenParenthesisOperator,
  skipWhitespaceAndComments,
  identifyExpression,
  skipWhitespaceAndComments,
  expectCloseParenthesisOperator
)

const ParenthesesExpression = {
  identify: (context, node) =>
    createParenthesesExpression({
      ...identifyParenthesesExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PARENTHESES_EXPRESSION,
  parse: (context, tokenList) =>
    parseParenthesesExpressionTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a CallExpression
      return false
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList)
    )
    return (
      operatorToken &&
      operatorToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
    )
  },
  type: ParserTypes.EXPRESSION
}

export default ParenthesesExpression
