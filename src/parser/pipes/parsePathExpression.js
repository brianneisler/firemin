import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import PathExpression from '../nodes/PathExpression'

const parsePathExpression = (props) => {
  const { children, context, tokenList } = props
  const expression = PathExpression.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: expression })
  return {
    ...props,
    children: append(expression, children),
    expression,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parsePathExpression
