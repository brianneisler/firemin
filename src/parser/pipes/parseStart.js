import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { parseNextNode } from '../util'

const START_PARSERS = [Identifier, Literal]
const parseStartNode = parseNextNode(START_PARSERS)

const parseStart = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      start: prevExpression
    }
  }
  const start = parseStartNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: start })
  return {
    ...props,
    children: append(start, children),
    start,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseStart
