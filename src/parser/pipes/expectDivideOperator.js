import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import DivideOperator from '../nodes/DivideOperator'

const expectDivideOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!DivideOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.DIVIDE}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectDivideOperator
