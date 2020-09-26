import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import OpenParenthesisOperator from '../nodes/OpenParenthesisOperator'

const expectOpenParenthesisOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!OpenParenthesisOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.OPEN_PARENTHESIS}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectOpenParenthesisOperator
