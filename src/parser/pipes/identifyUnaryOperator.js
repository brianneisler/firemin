import { head, tail } from 'ramda'

import LogicalNotOperator from '../nodes/LogicalNotOperator'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'
import UnaryPlusOperator from '../nodes/UnaryPlusOperator'
import { identifyNextNode } from '../util'

const UNARY_OPERATOR_IDENTIFIERS = [
  LogicalNotOperator,
  UnaryMinusOperator,
  UnaryPlusOperator
]
const identifyUnaryOperatorNode = identifyNextNode(UNARY_OPERATOR_IDENTIFIERS)

const identifyUnaryOperator = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const operator = identifyUnaryOperatorNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, operator }
}

export default identifyUnaryOperator
