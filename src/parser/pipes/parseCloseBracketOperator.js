import { append, slice } from 'ramda'
import CloseBracketOperator from '../nodes/CloseBracketOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseCloseBracketOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = CloseBracketOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseCloseBracketOperator
