import { head, tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import Range from '../nodes/Range'
import { identifyNextNode } from '../util'

const PROPERTY_IDENTIFIERS = [Range, Expression, Identifier, Literal]
const identifyPropertyNode = identifyNextNode(PROPERTY_IDENTIFIERS)

const identifyProperty = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const right = identifyPropertyNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, right }
}

export default identifyProperty
