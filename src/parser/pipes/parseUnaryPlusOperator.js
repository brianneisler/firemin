import { append, slice } from 'ramda'
import UnaryPlusOperator from '../nodes/UnaryPlusOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseUnaryPlusOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = UnaryPlusOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseUnaryPlusOperator
