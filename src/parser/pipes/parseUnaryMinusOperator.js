import { append, slice } from 'ramda'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseUnaryMinusOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = UnaryMinusOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseUnaryMinusOperator
