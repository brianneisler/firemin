import { append, pipe } from 'ramda'

import { TokenTypes } from '../../constants'

import parseCommaOperator from './parseCommaOperator'
import parseElement from './parseElement'
import parseWhitespaceAndComments from './parseWhitespaceAndComments'

const parseElementAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseElement,
  parseWhitespaceAndComments
)

const parseCommaElementAndWhitespace = pipe(
  parseCommaOperator,
  parseElementAndWhitespace
)

const parseElements = (props) => {
  let { children, context, tokenList } = props
  let elements = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    nextToken.type !== TokenTypes.OPERATOR_CLOSE_BRACKET
  ) {
    let element
    if (first) {
      first = false
      ;({ children, context, element, tokenList } = parseElementAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({
        children,
        context,
        element,
        tokenList
      } = parseCommaElementAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    elements = append(element, elements)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, elements, tokenList }
}

export default parseElements
