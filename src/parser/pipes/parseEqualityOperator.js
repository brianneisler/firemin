import { append, slice } from 'ramda'
import EqualityOperator from '../nodes/EqualityOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseEqualityOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = EqualityOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseEqualityOperator
