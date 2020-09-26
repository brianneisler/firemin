import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import CloseParenthesisOperator from '../nodes/CloseParenthesisOperator'

const expectCloseParenthesisOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!CloseParenthesisOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.CLOSE_PARENTHESIS}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectCloseParenthesisOperator
