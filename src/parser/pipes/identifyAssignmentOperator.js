import { head, tail } from 'ramda'

import AssignmentOperator from '../nodes/AssignmentOperator'

const identifyAssignmentOperator = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const operator = AssignmentOperator.identify(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, operator }
}

export default identifyAssignmentOperator
