import { append, slice } from 'ramda'
import CloseParenthesisOperator from '../nodes/CloseParenthesisOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseCloseParenthesisOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = CloseParenthesisOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseCloseParenthesisOperator
