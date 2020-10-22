import { head, tail } from 'ramda'

import Literal from '../nodes/Literal'
import { identifyNextNode } from '../util'

const LITERAL_IDENTIFIERS = [Literal]
const identifyLiteralNode = identifyNextNode(LITERAL_IDENTIFIERS)

const identifyLiteral = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const literal = identifyLiteralNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, literal }
}

export default identifyLiteral
