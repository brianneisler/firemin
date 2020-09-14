import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Identifier from '../nodes/Identifier'

const parseObject = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      object: prevExpression
    }
  }

  const object = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: object })
  return {
    ...props,
    children: append(object, children),
    object,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseObject
