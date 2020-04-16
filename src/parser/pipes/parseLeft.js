import { append, slice } from 'ramda'
import { parseNextNode } from '../util'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import generateTokenList from '../../generator/generateTokenList'

const LEFT_PARSERS = [Identifier, Literal]
const parseLeftNode = parseNextNode(LEFT_PARSERS)

const parseLeft = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      left: prevExpression
    }
  }
  const left = parseLeftNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: left })
  return {
    ...props,
    children: append(left, children),
    left,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLeft
