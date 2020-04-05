import { append, slice } from 'ramda'
import OpenBracketOperator from '../nodes/OpenBracketOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseOpenBracketOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = OpenBracketOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseOpenBracketOperator
