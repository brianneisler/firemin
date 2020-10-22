import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createStaticMemberExpression from '../pipes/createStaticMemberExpression'
import expectDotOperator from '../pipes/expectDotOperator'
import identifyObject from '../pipes/identifyObject'
import identifyStaticProperty from '../pipes/identifyStaticProperty'
import parseDotOperator from '../pipes/parseDotOperator'
import parseObject from '../pipes/parseObject'
import parseStaticProperty from '../pipes/parseStaticProperty'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseStaticMemberExpressionTokens = pipe(
  parseObject,
  parseWhitespaceAndComments,
  parseDotOperator,
  parseWhitespaceAndComments,
  parseStaticProperty,
  createStaticMemberExpression
)

const identifyStaticMemberExpressionChildren = pipe(
  identifyObject,
  skipWhitespaceAndComments,
  expectDotOperator,
  skipWhitespaceAndComments,
  identifyStaticProperty
)

const StaticMemberExpression = {
  identify: (context, node) =>
    createStaticMemberExpression({
      ...identifyStaticMemberExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.STATIC_MEMBER_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseStaticMemberExpressionTokens({
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
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_DOT
  },

  type: ParserTypes.EXPRESSION
}

export default StaticMemberExpression
