import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import Range from '../nodes/Range'
import { parseNextNode } from '../util'

const PROPERTY_PARSERS = [Range, Expression, Identifier, Literal]
const parsePropertyNode = parseNextNode(PROPERTY_PARSERS)

const parseProperty = (props) => {
  const { children, context, tokenList } = props
  const property = parsePropertyNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: property })
  return {
    ...props,
    children: append(property, children),
    property,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}
export default parseProperty
