import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import ReturnKeyword from '../nodes/ReturnKeyword'

const expectReturnKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!ReturnKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.RETURN}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectReturnKeyword
