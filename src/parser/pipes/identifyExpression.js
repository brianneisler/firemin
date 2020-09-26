import { tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { identifyNextNode } from '../util'

const EXPRESION_IDENTIFIERS = [Expression, Identifier, Literal]
const identifyExpressionNode = identifyNextNode(EXPRESION_IDENTIFIERS)

const identifyExpression = ({ children, context, ...rest }) => {
  const expression = identifyExpressionNode(context, children)
  children = tail(children)
  return { ...rest, children, context, expression }
}

export default identifyExpression
