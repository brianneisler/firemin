import { append, slice } from 'ramda'
import LessThanEqualOperator from '../nodes/LessThanEqualOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseLessThanEqualOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LessThanEqualOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLessThanEqualOperator
