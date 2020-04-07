import { append, slice } from 'ramda'
import CommaOperator from '../nodes/CommaOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseCommaOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = CommaOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseCommaOperator
