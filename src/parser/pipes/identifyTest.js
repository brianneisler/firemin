import { head, tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { identifyNextNode } from '../util'

const TEST_IDENTIFIERS = [Expression, Identifier, Literal]
const identifyTestNode = identifyNextNode(TEST_IDENTIFIERS)

const identifyTest = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const test = identifyTestNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, test }
}

export default identifyTest
