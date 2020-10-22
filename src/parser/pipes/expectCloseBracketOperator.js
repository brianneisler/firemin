import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import CloseBracketOperator from '../nodes/CloseBracketOperator'

const expectCloseBracketOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!CloseBracketOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.CLOSE_BRACKET}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectCloseBracketOperator
