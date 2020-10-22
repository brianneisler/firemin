import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import DollarSignOperator from '../nodes/DollarSignOperator'

const expectDollarSignOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!DollarSignOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.DOLLAR_SIGN}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectDollarSignOperator
