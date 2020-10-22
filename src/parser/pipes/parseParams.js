import { append, pipe } from 'ramda'

import { TokenTypes } from '../../constants'

import parseCloseParenthesisOperator from './parseCloseParenthesisOperator'
import parseCommaOperator from './parseCommaOperator'
import parseOpenParenthesisOperator from './parseOpenParenthesisOperator'
import parseParam from './parseParam'
import parseWhitespaceAndComments from './parseWhitespaceAndComments'

const parseParamAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseParam,
  parseWhitespaceAndComments
)

const parseCommaParamAndWhitespace = pipe(
  parseCommaOperator,
  parseParamAndWhitespace
)

const parseCommaSeparatedParams = (props) => {
  let { children, context, tokenList } = props
  let params = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    nextToken.type !== TokenTypes.OPERATOR_CLOSE_PARENTHESIS
  ) {
    let param
    if (first) {
      first = false
      ;({ children, context, param, tokenList } = parseParamAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({ children, context, param, tokenList } = parseCommaParamAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    params = append(param, params)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, params, tokenList }
}

const parseParams = pipe(
  parseOpenParenthesisOperator,
  parseCommaSeparatedParams,
  parseCloseParenthesisOperator
)

export default parseParams
