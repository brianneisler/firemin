import { head, tail } from 'ramda'

import { Operators } from '../../constants'
import AssignmentOperator from '../nodes/AssignmentOperator'

const expectAssignmentOperator = ({ children, ...rest }) => {
  const nextChild = head(children)
  if (!AssignmentOperator.is(nextChild)) {
    throw new Error(
      `Expected operator '${Operators.ASSIGNMENT}'. Instead found ${nextChild}`
    )
  }
  return {
    ...rest,
    children: tail(children)
  }
}

export default expectAssignmentOperator
