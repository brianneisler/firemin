import { head, tail } from 'ramda'

import IfStatement from '../nodes/IfStatement'
import { identifyNextNode } from '../util'

const CONDITION_IDENTIFIERS = [IfStatement]
const identifyConditionNode = identifyNextNode(CONDITION_IDENTIFIERS)

const identifyCondition = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const condition = identifyConditionNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, condition, context }
}

export default identifyCondition
