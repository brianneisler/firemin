import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { has, prop, slice } from 'ramda'

const OPERATOR_TOKEN_TYPE_TO_OPERATOR_TYPE = {
  [TokenTypes.OPERATOR_ASSIGNMENT]: OperatorTypes.ASSIGNMENT,
  [TokenTypes.OPERATOR_BACKWARD_SLASH]: OperatorTypes.BACKWARD_SLASH,
  [TokenTypes.OPERATOR_CLOSE_BRACKET]: OperatorTypes.CLOSE_BRACKET,
  [TokenTypes.OPERATOR_CLOSE_CURLY_BRACE]: OperatorTypes.CLOSE_CURLY_BRACE,
  [TokenTypes.OPERATOR_CLOSE_PARENTHESIS]: OperatorTypes.CLOSE_PARENTHESIS,
  [TokenTypes.OPERATOR_COLON]: OperatorTypes.COLON,
  [TokenTypes.OPERATOR_COMMA]: OperatorTypes.COMMA,
  [TokenTypes.OPERATOR_DIVIDE]: OperatorTypes.DIVIDE,
  [TokenTypes.OPERATOR_DOLLAR_SIGN]: OperatorTypes.DOLLAR_SIGN,
  [TokenTypes.OPERATOR_DOT]: OperatorTypes.DOT,
  [TokenTypes.OPERATOR_EQUALITY]: OperatorTypes.EQUALITY,
  [TokenTypes.OPERATOR_GREATER_THAN]: OperatorTypes.GREATER_THAN,
  [TokenTypes.OPERATOR_GREATER_THAN_EQUAL]: OperatorTypes.GREATER_THAN_EQUAL,
  [TokenTypes.KEYWORD_IN]: OperatorTypes.IN,
  [TokenTypes.OPERATOR_INEQUALITY]: OperatorTypes.INEQUALITY,
  [TokenTypes.OPERATOR_INFINITY]: OperatorTypes.INFINITY,
  [TokenTypes.OPERATOR_LESS_THAN]: OperatorTypes.LESS_THAN,
  [TokenTypes.OPERATOR_LESS_THAN_EQUAL]: OperatorTypes.LESS_THAN_EQUAL,
  [TokenTypes.OPERATOR_LOGICAL_AND]: OperatorTypes.LOGICAL_AND,
  [TokenTypes.OPERATOR_LOGICAL_NOT]: OperatorTypes.LOGICAL_NOT,
  [TokenTypes.OPERATOR_LOGICAL_OR]: OperatorTypes.LOGICAL_OR,
  [TokenTypes.OPERATOR_MODULUS]: OperatorTypes.MODULUS,
  [TokenTypes.OPERATOR_MULTIPLY]: OperatorTypes.MULTIPLY,
  [TokenTypes.OPERATOR_OPEN_BRACKET]: OperatorTypes.OPEN_BRACKET,
  [TokenTypes.OPERATOR_OPEN_CURLY_BRACE]: OperatorTypes.OPEN_CURLY_BRACE,
  [TokenTypes.OPERATOR_OPEN_PARENTHESIS]: OperatorTypes.OPEN_PARENTHESIS,
  [TokenTypes.OPERATOR_SEMICOLON]: OperatorTypes.OPEN_SEMICOLON,
  [TokenTypes.OPERATOR_UNARY_MINUS]: OperatorTypes.UNARY_MINUS,
  [TokenTypes.OPERATOR_UNARY_PLUS]: OperatorTypes.UNARY_PLUS
}

const Operator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!has(nextToken.type, OPERATOR_TOKEN_TYPE_TO_OPERATOR_TYPE)) {
      throw new Error('Expected Operator')
    }
    return {
      operatorType: prop(nextToken.type, OPERATOR_TOKEN_TYPE_TO_OPERATOR_TYPE),
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => has(tokenList.get(0).type, OPERATOR_TOKEN_TYPE_TO_OPERATOR_TYPE)
}

export default Operator
