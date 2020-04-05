import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex, parseNextNode } from '../util'
import parseIdentifier from '../pipes/parseIdentifier'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createStaticMemberExpression = pipe(
  parseIdentifier,
  parseWhitespaceAndComments,
  parseDotOperator,
  parseWhitespaceAndComments,
  parseRight,
  ({ children, left, operator, right }) => ({
    children,
    left,
    operator,
    right,
    type: NodeTypes.STATIC_MEMBER_EXPRESSION
  })
)

const StaticMemberExpression = {
  parse: (context, tokenList) =>
    createStaticMemberExpression({
      children: [],
      context,
      tokenList
    }),

  test: (context, tokenList) => {
    const identifierToken = findNextRealToken(tokenList)
    if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
      return false
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList))
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_DOT
  },

  type: ParserTypes.EXPRESSION
}

export default StaticMemberExpression
