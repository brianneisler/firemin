import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import OpenParenthesisOperator from '../nodes/OpenParenthesisOperator'

const parseOpenParenthesisOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = OpenParenthesisOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseOpenParenthesisOperator
