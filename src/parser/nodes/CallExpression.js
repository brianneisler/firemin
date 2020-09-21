import { append, pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import parseArgument from '../pipes/parseArgument'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseCommaOperator from '../pipes/parseCommaOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

const parseArgumentAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseArgument,
  parseWhitespaceAndComments
)

const parseCommaArgumentAndWhitespace = pipe(
  parseCommaOperator,
  parseArgumentAndWhitespace
)

const parseCommaSeparatedArgs = (props) => {
  let { children, context, tokenList } = props
  let args = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    nextToken.type !== TokenTypes.OPERATOR_CLOSE_PARENTHESIS
  ) {
    let argument
    if (first) {
      first = false
      ;({ argument, children, context, tokenList } = parseArgumentAndWhitespace(
        {
          children,
          context,
          tokenList
        }
      ))
    } else {
      ;({
        argument,
        children,
        context,
        tokenList
      } = parseCommaArgumentAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    args = append(argument, args)
    nextToken = tokenList.get(0)
  }
  return { ...props, args, children, context, tokenList }
}

const parseArgs = pipe(
  parseOpenParenthesisOperator,
  parseCommaSeparatedArgs,
  parseCloseParenthesisOperator
)

const parseCalleeIdentifier = pipe(
  parseIdentifier,
  ({ identifier, ...rest }) => ({
    ...rest,
    callee: identifier
  })
)

const parseCallee = (props) => {
  const { children, prevExpression } = props
  if (prevExpression) {
    return {
      ...props,
      callee: prevExpression,
      children: append(prevExpression, children)
    }
  }
  return parseCalleeIdentifier({ ...props })
}

const createCallExpression = pipe(
  parseCallee,
  parseWhitespaceAndComments,
  parseArgs,
  ({ args, callee, children }) => ({
    args,
    callee,
    children,
    id: uuidv4(),
    type: NodeTypes.CALL_EXPRESSION
  })
)

const CallExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createCallExpression({ children: [], context, prevExpression, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      const identifierToken = findNextRealToken(tokenList)
      if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return (
      operatorToken &&
      operatorToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
    )
  },
  type: ParserTypes.EXPRESSION
}

export default CallExpression
