import { append, slice } from 'ramda'
import LessThanOperator from '../nodes/LessThanOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseLessThanOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LessThanOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseLessThanOperator
