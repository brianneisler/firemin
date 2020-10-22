import { has, pipe } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createBinaryExpression from '../pipes/createBinaryExpression'
import identifyBinaryOperator from '../pipes/identifyBinaryOperator'
import identifyLeft from '../pipes/identifyLeft'
import identifyRight from '../pipes/identifyRight'
import parseBinaryOperator from '../pipes/parseBinaryOperator'
import parseLeft from '../pipes/parseLeft'
import parseRight from '../pipes/parseRight'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import {
  findNextRealToken,
  findNextRealTokenIndex,
  testNextNode
} from '../util'

import Identifier from './Identifier'
import Literal from './Literal'

const BINARY_OPERATOR_TOKEN_TYPES = {
  [TokenTypes.KEYWORD_IS]: OperatorTypes.IS,
  [TokenTypes.OPERATOR_DIVIDE]: OperatorTypes.DIVIDE,
  [TokenTypes.OPERATOR_EQUALITY]: OperatorTypes.EQUALITY,
  [TokenTypes.OPERATOR_GREATER_THAN]: OperatorTypes.GREATER_THAN,
  [TokenTypes.OPERATOR_GREATER_THAN_EQUAL]: OperatorTypes.GREATER_THAN_EQUAL,
  [TokenTypes.OPERATOR_INEQUALITY]: OperatorTypes.INEQUALITY,
  [TokenTypes.OPERATOR_LESS_THAN]: OperatorTypes.LESS_THAN,
  [TokenTypes.OPERATOR_LESS_THAN_EQUAL]: OperatorTypes.LESS_THAN_EQUAL,
  [TokenTypes.OPERATOR_LOGICAL_AND]: OperatorTypes.LOGICAL_AND,
  [TokenTypes.OPERATOR_LOGICAL_OR]: OperatorTypes.LOGICAL_OR,
  [TokenTypes.OPERATOR_MODULUS]: OperatorTypes.MODULUS,
  [TokenTypes.OPERATOR_MULTIPLY]: OperatorTypes.MULTIPLY,
  [TokenTypes.OPERATOR_UNARY_MINUS]: OperatorTypes.UNARY_MINUS,
  [TokenTypes.OPERATOR_UNARY_PLUS]: OperatorTypes.UNARY_PLUS
}

const parseBinaryExpressionTokens = pipe(
  parseLeft,
  parseWhitespaceAndComments,
  parseBinaryOperator,
  parseWhitespaceAndComments,
  parseRight,
  createBinaryExpression
)

const identifyBinaryExpressionChildren = pipe(
  identifyLeft,
  skipWhitespaceAndComments,
  identifyBinaryOperator,
  skipWhitespaceAndComments,
  identifyRight
)

const LEFT_PARSERS = [Identifier, Literal]

const BinaryExpression = {
  identify: (context, node) =>
    createBinaryExpression({
      ...identifyBinaryExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.BINARY_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseBinaryExpressionTokens({
      children: [],
      context,
      prevExpression,
      tokenList
    }),
  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      if (!testNextNode(LEFT_PARSERS, context, tokenList)) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return operatorToken && has(operatorToken.type, BINARY_OPERATOR_TOKEN_TYPES)
  },
  type: ParserTypes.EXPRESSION
}

export default BinaryExpression
