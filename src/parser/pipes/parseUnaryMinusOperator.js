import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'

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
