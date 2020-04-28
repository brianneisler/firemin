import { append, slice } from 'ramda'
import { parseNextNode } from '../util'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import generateTokenList from '../../generator/generateTokenList'

const TEST_PARSERS = [Identifier, Literal]
const parseTestNode = parseNextNode(TEST_PARSERS)

const parseTest = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      test: prevExpression
    }
  }
  const test = parseTestNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: test })
  return {
    ...props,
    children: append(test, children),
    test,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseTest
