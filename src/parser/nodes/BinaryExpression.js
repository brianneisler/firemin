import { NodeTypes, OperatorTypes, ParserTypes, TokenTypes } from '../../constants'
import { findNextRealToken, findNextRealTokenIndex, testNextNode } from '../util'
import { has, pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import Identifier from './Identifier'
import Literal from './Literal'
import parseLeft from '../pipes/parseLeft'
import parseOperator from '../pipes/parseOperator'
import parseRight from '../pipes/parseRight'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const BINARY_OPERATOR_TOKEN_TYPES = {
  [TokenTypes.KEYWORD_IS]: OperatorTypes.IS,
  [TokenTypes.OPERATOR_COLON]: OperatorTypes.COLON,
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

const createBinaryExpression = pipe(
  parseLeft,
  parseWhitespaceAndComments,
  parseOperator,
  parseWhitespaceAndComments,
  parseRight,
  ({ children, left, operator, right }) => ({
    children,
    id: uuidv4(),
    left,
    operator,
    right,
    type: NodeTypes.BINARY_EXPRESSION
  })
)

const LEFT_PARSERS = [Identifier, Literal]

const BinaryExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createBinaryExpression({
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
