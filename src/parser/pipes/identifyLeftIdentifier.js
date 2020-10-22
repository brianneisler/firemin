import { head, tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import { identifyNextNode } from '../util'

const LEFT_IDENTIFIER_IDENTIFIERS = [Expression, Identifier]
const identifyLeftIdentifierNode = identifyNextNode(LEFT_IDENTIFIER_IDENTIFIERS)

const identifyLeftIdentifier = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const left = identifyLeftIdentifierNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, left }
}

export default identifyLeftIdentifier
