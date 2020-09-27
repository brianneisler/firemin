import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import LetKeyword from '../nodes/LetKeyword'

const expectLetKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!LetKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.LET}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectLetKeyword
