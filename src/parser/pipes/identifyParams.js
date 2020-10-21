import { append, head, length, pipe } from 'ramda'

import CloseParenthesisOperator from '../nodes/CloseParenthesisOperator'

import expectCloseParenthesisOperator from './expectCloseParenthesisOperator'
import expectCommaOperator from './expectCommaOperator'
import expectOpenParenthesisOperator from './expectOpenParenthesisOperator'
import identifyParam from './identifyParam'
import skipWhitespaceAndComments from './skipWhitespaceAndComments'

const identifyParamAndWhitespace = pipe(
  skipWhitespaceAndComments,
  identifyParam,
  skipWhitespaceAndComments
)

const identifyCommaParamAndWhitespace = pipe(
  expectCommaOperator,
  identifyParamAndWhitespace
)

const identifyCommaSeparatedParams = (props) => {
  let { children, context } = props
  let params = []
  let first = true
  let nextChild = head(children)
  while (length(children) > 0 && !CloseParenthesisOperator.is(nextChild)) {
    let param
    if (first) {
      first = false
      ;({ children, context, param } = identifyParamAndWhitespace({
        children,
        context
      }))
    } else {
      ;({ children, context, param } = identifyCommaParamAndWhitespace({
        children,
        context
      }))
    }
    params = append(param, params)
    nextChild = head(children)
  }
  return { ...props, children, context, params }
}

const identifyParams = pipe(
  expectOpenParenthesisOperator,
  identifyCommaSeparatedParams,
  expectCloseParenthesisOperator
)

export default identifyParams
