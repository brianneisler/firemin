import { tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { identifyNextNode } from '../util'

const RIGHT_IDENTIFIERS = [Expression, Identifier, Literal]
const identifyRightNode = identifyNextNode(RIGHT_IDENTIFIERS)

const identifyRight = ({ children, context, ...rest }) => {
  const right = identifyRightNode(context, children)
  children = tail(children)
  return { ...rest, children, context, right }
}

export default identifyRight
