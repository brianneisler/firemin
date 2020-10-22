import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import OpenBracketOperator from '../nodes/OpenBracketOperator'

const expectOpenBracketOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!OpenBracketOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.OPEN_BRACKET}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectOpenBracketOperator
