import { pipe } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createPathPartExpression from '../pipes/createPathPartExpression'
import expectCloseParenthesisOperator from '../pipes/expectCloseParenthesisOperator'
import expectDivideOperator from '../pipes/expectDivideOperator'
import expectDollarSignOperator from '../pipes/expectDollarSignOperator'
import expectOpenParenthesisOperator from '../pipes/expectOpenParenthesisOperator'
import identifyExpression from '../pipes/identifyExpression'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseDollarSignOperator from '../pipes/parseDollarSignOperator'
import parseExpression from '../pipes/parseExpression'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parsePathPartExpressionTokens = pipe(
  parseDivideOperator,
  parseDollarSignOperator,
  parseOpenParenthesisOperator,
  parseWhitespaceAndComments,
  parseExpression,
  parseWhitespaceAndComments,
  parseCloseParenthesisOperator,
  createPathPartExpression
)

const identifyPathPartExpressionChildren = pipe(
  expectDivideOperator,
  expectDollarSignOperator,
  expectOpenParenthesisOperator,
  skipWhitespaceAndComments,
  identifyExpression,
  skipWhitespaceAndComments,
  expectCloseParenthesisOperator,
  createPathPartExpression
)

const PathPartExpression = {
  identify: (context, node) =>
    createPathPartExpression({
      ...identifyPathPartExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PATH_PART_EXPRESSION,
  parse: (context, tokenList) =>
    parsePathPartExpressionTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a CallExpression
      return false
    }
    const firstToken = tokenList.get(0)
    const secondToken = tokenList.get(1)
    const thirdToken = tokenList.get(2)
    return (
      firstToken &&
      firstToken.type === TokenTypes.OPERATOR_DIVIDE &&
      secondToken &&
      secondToken.type === TokenTypes.OPERATOR_DOLLAR_SIGN &&
      thirdToken &&
      thirdToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
    )
  }
}

export default PathPartExpression
