import { NodeTypes, TokenTypes } from '../../constants'
import { has, slice } from 'ramda'

const OPERATOR_TOKEN_TYPES = {
  [TokenTypes.OPERATOR_ASSIGNMENT]: true,
  [TokenTypes.OPERATOR_DIVIDE]: true,
  [TokenTypes.OPERATOR_EQUALITY]: true,
  [TokenTypes.OPERATOR_GREATER_THAN]: true,
  [TokenTypes.OPERATOR_GREATER_THAN_EQUAL]: true,
  [TokenTypes.OPERATOR_INEQUALITY]: true,
  [TokenTypes.OPERATOR_LESS_THAN]: true,
  [TokenTypes.OPERATOR_LESS_THAN_EQUAL]: true,
  [TokenTypes.OPERATOR_LOGICAL_AND]: true,
  [TokenTypes.OPERATOR_LOGICAL_NOT]: true,
  [TokenTypes.OPERATOR_LOGICAL_OR]: true,
  [TokenTypes.OPERATOR_MODULUS]: true,
  [TokenTypes.OPERATOR_MULTIPLY]: true,
  [TokenTypes.OPERATOR_UNARY_MINUS]: true,
  [TokenTypes.OPERATOR_UNARY_PLUS]: true
}

const Operator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!has(nextToken.type, OPERATOR_TOKEN_TYPES)) {
      throw new Error('Expected Operator')
    }
    return {
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.Operator,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => has(tokenList.get(0).type, OPERATOR_TOKEN_TYPES)
}

export default Operator
