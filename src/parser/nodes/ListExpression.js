import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createListExpression from '../pipes/createListExpression'
import expectCloseBracketOperator from '../pipes/expectCloseBracketOperator'
import expectOpenBracketOperator from '../pipes/expectOpenBracketOperator'
import identifyElements from '../pipes/identifyElements'
import parseCloseBracketOperator from '../pipes/parseCloseBracketOperator'
import parseElements from '../pipes/parseElements'
import parseOpenBracketOperator from '../pipes/parseOpenBracketOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseListExpressionTokens = pipe(
  parseOpenBracketOperator,
  parseWhitespaceAndComments,
  parseElements,
  parseWhitespaceAndComments,
  parseCloseBracketOperator,
  createListExpression
)

const identifyListExpressionChildren = pipe(
  expectOpenBracketOperator,
  skipWhitespaceAndComments,
  identifyElements,
  skipWhitespaceAndComments,
  expectCloseBracketOperator
)

const ListExpression = {
  identify: (context, node) =>
    createListExpression({
      ...identifyListExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.LIST_EXPRESSION,
  parse: (context, tokenList) =>
    parseListExpressionTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a ComputedMemberExpression
      return false
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList)
    )
    return (
      operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_BRACKET
    )
  },
  type: ParserTypes.EXPRESSION
}

export default ListExpression
