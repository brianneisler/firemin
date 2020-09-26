import { append, head, length, pipe } from 'ramda'

import CloseParenthesisOperator from '../nodes/CloseParenthesisOperator'

import expectCloseParenthesisOperator from './expectCloseParenthesisOperator'
import expectCommaOperator from './expectCommaOperator'
import expectOpenParenthesisOperator from './expectOpenParenthesisOperator'
import identifyArgument from './identifyArgument'
import skipWhitespaceAndComments from './skipWhitespaceAndComments'

const identifyArgumentAndWhitespace = pipe(
  skipWhitespaceAndComments,
  identifyArgument,
  skipWhitespaceAndComments
)

const identifyCommaArgumentAndWhitespace = pipe(
  expectCommaOperator,
  identifyArgumentAndWhitespace
)

const identifyCommaSeparatedArgs = (props) => {
  let { children, context } = props
  let args = []
  let first = true
  let nextChild = head(children)
  while (length(children) > 0 && !CloseParenthesisOperator.is(nextChild)) {
    let argument
    if (first) {
      first = false
      ;({ argument, children, context } = identifyArgumentAndWhitespace({
        children,
        context
      }))
    } else {
      ;({ argument, children, context } = identifyCommaArgumentAndWhitespace({
        children,
        context
      }))
    }
    args = append(argument, args)
    nextChild = head(children)
  }
  return { ...props, args, children, context }
}

const identifyArgs = pipe(
  expectOpenParenthesisOperator,
  identifyCommaSeparatedArgs,
  expectCloseParenthesisOperator
)

export default identifyArgs
