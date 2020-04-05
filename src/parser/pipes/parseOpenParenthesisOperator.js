import { append, slice } from 'ramda'
import OpenParenthesisOperator from '../nodes/OpenParenthesisOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseOpenParenthesisOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = OpenParenthesisOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseOpenParenthesisOperator
