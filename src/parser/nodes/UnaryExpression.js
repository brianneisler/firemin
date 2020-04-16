import { NodeTypes, OperatorTypes, ParserTypes, TokenTypes } from '../../constants'
import { has, pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import parseArgument from '../pipes/parseArgument'
import parseOperator from '../pipes/parseOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const UNARY_OPERATOR_TOKEN_TYPES = {
  [TokenTypes.OPERATOR_LOGICAL_NOT]: OperatorTypes.LOGICAL_NOT,
  [TokenTypes.OPERATOR_UNARY_MINUS]: OperatorTypes.UNARY_MINUS,
  [TokenTypes.OPERATOR_UNARY_PLUS]: OperatorTypes.UNARY_PLUS
}

const createUnaryExpression = pipe(
  parseOperator,
  parseWhitespaceAndComments,
  parseArgument,
  ({ argument, children, operator }) => ({
    argument,
    children,
    id: uuidv4(),
    operator,
    type: NodeTypes.UNARY_EXPRESSION
  })
)

const UnaryExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createUnaryExpression({
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
