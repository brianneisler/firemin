import { append, slice } from 'ramda'
import GreaterThanEqualOperator from '../nodes/GreaterThanEqualOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseGreaterThanEqualOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = GreaterThanEqualOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseGreaterThanEqualOperator
