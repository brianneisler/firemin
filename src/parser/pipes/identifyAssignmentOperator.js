import { head, tail } from 'ramda'

import AssignmentOperator from '../nodes/AssignmentOperator'
import { identifyNextNode } from '../util'

const ASSIGNMENT_OPERATOR_IDENTIFIERS = [AssignmentOperator]
const identifyAssignmentOperatorNode = identifyNextNode(
  ASSIGNMENT_OPERATOR_IDENTIFIERS
)

const identifyAssignmentOperator = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const operator = identifyAssignmentOperatorNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, operator }
}

export default identifyAssignmentOperator
