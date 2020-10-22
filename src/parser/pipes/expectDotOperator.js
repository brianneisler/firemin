import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import DotOperator from '../nodes/DotOperator'

const expectDotOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!DotOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.DOT}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectDotOperator
