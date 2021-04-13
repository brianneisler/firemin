import { TokenTypes } from 'firetree'

const {
  COMMENT,
  OPERATOR_ASSIGNMENT,
  OPERATOR_BACKWARD_SLASH,
  OPERATOR_CLOSE_BRACKET,
  OPERATOR_CLOSE_CURLY_BRACE,
  OPERATOR_CLOSE_PARENTHESIS,
  OPERATOR_COLON,
  OPERATOR_COMMA,
  OPERATOR_DIVIDE,
  OPERATOR_DOT,
  OPERATOR_EQUALITY,
  OPERATOR_GREATER_THAN,
  OPERATOR_GREATER_THAN_EQUAL,
  OPERATOR_INEQUALITY,
  OPERATOR_LESS_THAN,
  OPERATOR_LESS_THAN_EQUAL,
  OPERATOR_LOGICAL_AND,
  OPERATOR_LOGICAL_NOT,
  OPERATOR_LOGICAL_OR,
  OPERATOR_MODULUS,
  OPERATOR_MULTIPLY,
  OPERATOR_OPEN_BRACKET,
  OPERATOR_OPEN_CURLY_BRACE,
  OPERATOR_OPEN_PARENTHESIS,
  OPERATOR_SEMICOLON,
  OPERATOR_UNARY_MINUS,
  OPERATOR_UNARY_PLUS,
  WHITESPACE
} = TokenTypes

const PRESERVE_WHITESPACE = false
const minimizeTokenList = (context, tokenList) =>
  tokenList
    // filter out comments
    .filter((token) => token.type !== COMMENT)
    // Replace all whitespace spans with a single space
    .map((token) => {
      if (token.type === WHITESPACE) {
        if (token.length > 1) {
          if (!PRESERVE_WHITESPACE || !token.value.includes('\n')) {
            return {
              length: 1,
              type: WHITESPACE,
              value: ' '
            }
          }
          return {
            length: 1,
            type: WHITESPACE,
            value: '\n'
          }
        }
      }
      return token
    })
    // filter out all unnecessary whitespace
    .filter((token, index, list) => {
      if (PRESERVE_WHITESPACE) {
        return true
      }
      if (index > 0) {
        if (index === list.length - 1) {
          return token.type !== WHITESPACE
        }
        const prevToken = list.get(index - 1)
        const nextToken = list.get(index + 1)
        if (token.type === WHITESPACE) {
          return (
            prevToken.type !== WHITESPACE &&
            prevToken.type !== OPERATOR_ASSIGNMENT &&
            prevToken.type !== OPERATOR_BACKWARD_SLASH &&
            prevToken.type !== OPERATOR_CLOSE_BRACKET &&
            prevToken.type !== OPERATOR_CLOSE_CURLY_BRACE &&
            prevToken.type !== OPERATOR_CLOSE_PARENTHESIS &&
            prevToken.type !== OPERATOR_COLON &&
            prevToken.type !== OPERATOR_COMMA &&
            prevToken.type !== OPERATOR_DIVIDE &&
            prevToken.type !== OPERATOR_DOT &&
            prevToken.type !== OPERATOR_EQUALITY &&
            prevToken.type !== OPERATOR_GREATER_THAN &&
            prevToken.type !== OPERATOR_GREATER_THAN_EQUAL &&
            prevToken.type !== OPERATOR_INEQUALITY &&
            prevToken.type !== OPERATOR_LESS_THAN &&
            prevToken.type !== OPERATOR_LESS_THAN_EQUAL &&
            prevToken.type !== OPERATOR_LOGICAL_AND &&
            prevToken.type !== OPERATOR_LOGICAL_NOT &&
            prevToken.type !== OPERATOR_LOGICAL_OR &&
            prevToken.type !== OPERATOR_MODULUS &&
            prevToken.type !== OPERATOR_MULTIPLY &&
            prevToken.type !== OPERATOR_OPEN_BRACKET &&
            prevToken.type !== OPERATOR_OPEN_CURLY_BRACE &&
            prevToken.type !== OPERATOR_OPEN_PARENTHESIS &&
            prevToken.type !== OPERATOR_SEMICOLON &&
            prevToken.type !== OPERATOR_UNARY_MINUS &&
            prevToken.type !== OPERATOR_UNARY_PLUS &&
            nextToken.type !== OPERATOR_ASSIGNMENT &&
            nextToken.type !== OPERATOR_BACKWARD_SLASH &&
            nextToken.type !== OPERATOR_CLOSE_BRACKET &&
            nextToken.type !== OPERATOR_CLOSE_CURLY_BRACE &&
            nextToken.type !== OPERATOR_CLOSE_PARENTHESIS &&
            nextToken.type !== OPERATOR_COLON &&
            nextToken.type !== OPERATOR_COMMA &&
            nextToken.type !== OPERATOR_DIVIDE &&
            nextToken.type !== OPERATOR_DOT &&
            nextToken.type !== OPERATOR_EQUALITY &&
            nextToken.type !== OPERATOR_GREATER_THAN &&
            nextToken.type !== OPERATOR_GREATER_THAN_EQUAL &&
            nextToken.type !== OPERATOR_INEQUALITY &&
            nextToken.type !== OPERATOR_LESS_THAN &&
            nextToken.type !== OPERATOR_LESS_THAN_EQUAL &&
            nextToken.type !== OPERATOR_LOGICAL_AND &&
            nextToken.type !== OPERATOR_LOGICAL_NOT &&
            nextToken.type !== OPERATOR_LOGICAL_OR &&
            nextToken.type !== OPERATOR_MODULUS &&
            nextToken.type !== OPERATOR_MULTIPLY &&
            nextToken.type !== OPERATOR_OPEN_BRACKET &&
            nextToken.type !== OPERATOR_OPEN_CURLY_BRACE &&
            nextToken.type !== OPERATOR_OPEN_PARENTHESIS &&
            nextToken.type !== OPERATOR_SEMICOLON &&
            nextToken.type !== OPERATOR_UNARY_MINUS &&
            nextToken.type !== OPERATOR_UNARY_PLUS
          )
        }
      }
      return true
    })

export default minimizeTokenList
