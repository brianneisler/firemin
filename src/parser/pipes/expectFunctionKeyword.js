import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import FunctionKeyword from '../nodes/FunctionKeyword'

const expectFunctionKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!FunctionKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.FUNCTION}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectFunctionKeyword
