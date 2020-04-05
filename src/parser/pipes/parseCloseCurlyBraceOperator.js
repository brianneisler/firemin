import { append, slice } from 'ramda'
import CloseCurlyBraceOperator from '../nodes/CloseCurlyBraceOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseCloseCurlyBraceOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = CloseCurlyBraceOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseCloseCurlyBraceOperator
