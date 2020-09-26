import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import OpenCurlyBraceOperator from '../nodes/OpenCurlyBraceOperator'

const expectOpenCurlyBraceOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!OpenCurlyBraceOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.OPEN_CURLY_BRACE}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectOpenCurlyBraceOperator
