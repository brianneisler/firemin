import { append, slice } from 'ramda'
import { parseNextNode } from '../util'
import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import generateTokenList from '../../generator/generateTokenList'

const RIGHT_PARSERS = [Expression, Identifier, Literal]
const parseRightNode = parseNextNode(RIGHT_PARSERS)

// NOTE BRN: Right can be another Expression
const parseRight = (props) => {
  const { children, context, tokenList } = props
  const right = parseRightNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: right })
  return {
    ...props,
    children: append(right, children),
    right,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseRight
