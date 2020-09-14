import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, TokenTypes } from '../../constants'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseDollarSignOperator from '../pipes/parseDollarSignOperator'
import parseExpression from '../pipes/parseExpression'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createPathPartExpression = pipe(
  parseDivideOperator,
  parseDollarSignOperator,
  parseOpenParenthesisOperator,
  parseWhitespaceAndComments,
  parseExpression,
  parseWhitespaceAndComments,
  parseCloseParenthesisOperator,
  ({ children, expression }) => ({
    children,
    expression,
    id: uuidv4(),
    type: NodeTypes.PATH_PART_EXPRESSION
  })
)

const PathPartExpression = {
  parse: (context, tokenList) =>
    createPathPartExpression({ children: [], context, tokenList }),
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
