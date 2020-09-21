import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import CloseParenthesisOperator from '../nodes/CloseParenthesisOperator'

const parseCloseParenthesisOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = CloseParenthesisOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseCloseParenthesisOperator
