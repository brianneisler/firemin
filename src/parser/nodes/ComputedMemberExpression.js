import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createComputedMemberExpression from '../pipes/createComputedMemberExpression'
import expectCloseBracketOperator from '../pipes/expectCloseBracketOperator'
import expectOpenBracketOperator from '../pipes/expectOpenBracketOperator'
import identifyObject from '../pipes/identifyObject'
import identifyProperty from '../pipes/identifyProperty'
import parseCloseBracketOperator from '../pipes/parseCloseBracketOperator'
import parseObject from '../pipes/parseObject'
import parseOpenBracketOperator from '../pipes/parseOpenBracketOperator'
import parseProperty from '../pipes/parseProperty'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseComputedMemberExpressionTokens = pipe(
  parseObject,
  parseWhitespaceAndComments,
  parseOpenBracketOperator,
  parseWhitespaceAndComments,
  parseProperty,
  parseWhitespaceAndComments,
  parseCloseBracketOperator,
  createComputedMemberExpression
)

const identifyComputedMemberExpressionChildren = pipe(
  identifyObject,
  skipWhitespaceAndComments,
  expectOpenBracketOperator,
  skipWhitespaceAndComments,
  identifyProperty,
  skipWhitespaceAndComments,
  expectCloseBracketOperator
)

const ComputedMemberExpression = {
  identify: (context, node) =>
    createComputedMemberExpression({
      ...identifyComputedMemberExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.COMPUTED_MEMBER_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseComputedMemberExpressionTokens({
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
      operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_BRACKET
    )
  },
  type: ParserTypes.EXPRESSION
}

export default ComputedMemberExpression
