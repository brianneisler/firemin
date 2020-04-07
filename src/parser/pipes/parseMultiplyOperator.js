import { append, slice } from 'ramda'
import MultiplyOperator from '../nodes/MultiplyOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseMultiplyOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = MultiplyOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseMultiplyOperator
