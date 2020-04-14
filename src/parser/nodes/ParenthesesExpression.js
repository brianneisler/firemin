import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { findNextRealToken, findNextRealTokenIndex } from '../util'
import { pipe } from 'ramda'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseExpression from '../pipes/parseExpression'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createParenthesesExpression = pipe(
  parseOpenParenthesisOperator,
  parseWhitespaceAndComments,
  parseExpression,
  parseWhitespaceAndComments,
  parseCloseParenthesisOperator,
  ({ children, expression }) => ({
    children,
    expression,
    type: NodeTypes.PARENTHESES_EXPRESSION
  })
)

const ParenthesesExpression = {
  parse: (context, tokenList) => createParenthesesExpression({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a CallExpression
      return false
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList))
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
  },
  type: ParserTypes.EXPRESSION
}

export default ParenthesesExpression
