import { head, tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import { identifyNextNode } from '../util'

const CALLEE_IDENTIFIERS = [Expression, Identifier]
const identifyCalleeNode = identifyNextNode(CALLEE_IDENTIFIERS)

const identifyCallee = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const callee = identifyCalleeNode(context, nextChild)
  children = tail(children)
  return { ...rest, callee, children, context }
}

export default identifyCallee
