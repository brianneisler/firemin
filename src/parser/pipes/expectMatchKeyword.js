import { head, tail } from 'ramda'

import { Keywords } from '../../constants'
import MatchKeyword from '../nodes/MatchKeyword'

const expectMatchKeyword = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!MatchKeyword.is(nextChild)) {
    throw new Error(
      `Expected keyword '${Keywords.MATCH}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectMatchKeyword
