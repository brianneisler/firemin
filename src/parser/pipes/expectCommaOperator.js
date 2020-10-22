import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import CommaOperator from '../nodes/CommaOperator'

const expectCommaOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!CommaOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.COMMA}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectCommaOperator
