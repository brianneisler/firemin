import { tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import { identifyNextNode } from '../util'

const OBJECT_IDENTIFIERS = [Expression, Identifier]
const identifyObjectNode = identifyNextNode(OBJECT_IDENTIFIERS)

const identifyObject = ({ children, context, ...rest }) => {
  const object = identifyObjectNode(context, children)
  children = tail(children)
  return { ...rest, children, context, object }
}

export default identifyObject
