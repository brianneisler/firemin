import { append, slice } from 'ramda'
import CloseBracketOperator from '../nodes/CloseBracketOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseCloseBracketOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = CloseBracketOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseCloseBracketOperator
