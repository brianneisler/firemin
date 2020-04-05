import { append, slice } from 'ramda'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseUnaryMinusOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = UnaryMinusOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseUnaryMinusOperator
