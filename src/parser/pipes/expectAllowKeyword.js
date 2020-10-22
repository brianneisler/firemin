import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import AllowKeyword from '../nodes/AllowKeyword'

const expectAllowKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!AllowKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.ALLOW}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectAllowKeyword
