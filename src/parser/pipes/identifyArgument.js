import { tail } from 'ramda'

import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { identifyNextNode } from '../util'

const ARGUMENT_IDENTIFIERS = [Expression, Identifier, Literal]
const identifyArgumentNode = identifyNextNode(ARGUMENT_IDENTIFIERS)

const identifyArgument = ({ children, context, ...rest }) => {
  const argument = identifyArgumentNode(context, children)
  children = tail(children)
  return { ...rest, argument, children, context }
}

export default identifyArgument
