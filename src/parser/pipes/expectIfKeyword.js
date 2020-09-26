import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import IfKeyword from '../nodes/IfKeyword'

const expectIfKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!IfKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.IF}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectIfKeyword
