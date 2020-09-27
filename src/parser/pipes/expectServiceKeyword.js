import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import ServiceKeyword from '../nodes/ServiceKeyword'

const expectServiceKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!ServiceKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.SERVICE}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectServiceKeyword
