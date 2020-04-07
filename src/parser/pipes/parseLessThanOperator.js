import { append, slice } from 'ramda'
import LessThanOperator from '../nodes/LessThanOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseLessThanOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LessThanOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLessThanOperator
