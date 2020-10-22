import { has, pipe } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createUnaryExpression from '../pipes/createUnaryExpression'
import identifyArgument from '../pipes/identifyArgument'
import identifyOperator from '../pipes/identifyOperator'
import parseArgument from '../pipes/parseArgument'
import parseOperator from '../pipes/parseOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const UNARY_OPERATOR_TOKEN_TYPES = {
  [TokenTypes.OPERATOR_LOGICAL_NOT]: OperatorTypes.LOGICAL_NOT,
  [TokenTypes.OPERATOR_UNARY_MINUS]: OperatorTypes.UNARY_MINUS,
  [TokenTypes.OPERATOR_UNARY_PLUS]: OperatorTypes.UNARY_PLUS
}

const parseUnaryExpressionTokens = pipe(
  parseOperator,
  parseWhitespaceAndComments,
  parseArgument,
  createUnaryExpression
)

const identifyUnaryExpressionChildren = pipe(
  identifyOperator,
  skipWhitespaceAndComments,
  identifyArgument
)

const UnaryExpression = {
  identify: (context, node) =>
    createUnaryExpression({
      ...identifyUnaryExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.UNARY_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseUnaryExpressionTokens({
      children: [],
      context,
      prevExpression,
      tokenList
    }),
  test: (context, tokenList, prevExpression = null) =>
    !prevExpression && has(tokenList.get(0).type, UNARY_OPERATOR_TOKEN_TYPES),
  type: ParserTypes.EXPRESSION
}

export default UnaryExpression
