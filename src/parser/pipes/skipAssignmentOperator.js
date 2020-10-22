import { head, tail } from 'ramda'

import AssignmentOperator from '../nodes/AssignmentOperator'

const skipAssignmentOperator = (props) => {
  const { children } = props
  if (!AssignmentOperator.is(head(children))) {
    return props
  }
  return {
    ...props,
    children: tail(children)
  }
}

export default skipAssignmentOperator
