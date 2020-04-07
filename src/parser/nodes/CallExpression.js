import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex } from '../util'
import parseArgument from '../pipes/parseArgument'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseCommaOperator from '../pipes/parseCommaOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseArgumentAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseArgument,
  parseWhitespaceAndComments
)

const parseCommaArgumentAndWhitespace = pipe(parseCommaOperator, parseArgumentAndWhitespace)

const parseCommaSeparatedArgs = (props) => {
  let { children, context, tokenList } = props
  let args = []
  let first = true
  const nextToken = tokenList.get(0)
  while (tokenList.size > 0 && nextToken.type !== TokenTypes.OPERATOR_CLOSE_PARENTHESIS) {
    let argument
    if (first) {
      first = false
      ;({ argument, children, context, tokenList } = parseArgumentAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({ argument, children, context, tokenList } = parseCommaArgumentAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    args = append(argument, args)
  }
  return { ...props, args, children, context, tokenList }
}

const parseArgs = pipe(
  parseOpenParenthesisOperator,
  parseCommaSeparatedArgs,
  parseCloseParenthesisOperator
)

const parseCallee = pipe(parseIdentifier, ({ identifier, ...rest }) => ({
  ...rest,
  callee: identifier
}))

const createCallExpression = pipe(
  parseCallee,
  parseWhitespaceAndComments,
  parseArgs,
  ({ args, callee, children }) => ({
    args,
    callee,
    children,
    type: NodeTypes.CALL_EXPRESSION
  })
)

const CallExpression = {
  parse: (context, tokenList) => createCallExpression({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const identifierToken = findNextRealToken(tokenList)
    if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
      return false
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList) + 1)
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
  },
  type: ParserTypes.EXPRESSION
}

export default CallExpression
