import { append, pipe } from 'ramda'

import { TokenTypes } from '../../constants'

import parseArgument from './parseArgument'
import parseCloseParenthesisOperator from './parseCloseParenthesisOperator'
import parseCommaOperator from './parseCommaOperator'
import parseOpenParenthesisOperator from './parseOpenParenthesisOperator'
import parseWhitespaceAndComments from './parseWhitespaceAndComments'

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

export default parseArgs
