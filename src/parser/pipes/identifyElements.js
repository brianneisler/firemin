import { append, head, length, pipe } from 'ramda'

import CloseBracketOperator from '../nodes/CloseBracketOperator'

import expectCommaOperator from './expectCommaOperator'
import identifyElement from './identifyElement'
import skipWhitespaceAndComments from './skipWhitespaceAndComments'

const identifyElementAndWhitespace = pipe(
  skipWhitespaceAndComments,
  identifyElement,
  skipWhitespaceAndComments
)

const identifyCommaElementAndWhitespace = pipe(
  expectCommaOperator,
  identifyElementAndWhitespace
)

const identifyElements = (props) => {
  let { children, context } = props
  let elements = []
  let first = true
  let nextChild = head(children)
  while (length(children) > 0 && !CloseBracketOperator.is(nextChild)) {
    let element
    if (first) {
      first = false
      ;({ children, context, element } = identifyElementAndWhitespace({
        children,
        context
      }))
    } else {
      ;({ children, context, element } = identifyCommaElementAndWhitespace({
        children,
        context
      }))
    }
    elements = append(element, elements)
    nextChild = head(children)
  }
  return { ...props, children, context, elements }
}

export default identifyElements
