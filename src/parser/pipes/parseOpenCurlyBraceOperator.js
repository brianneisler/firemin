import { append, slice } from 'ramda'
import OpenCurlyBraceOperator from '../nodes/OpenCurlyBraceOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseOpenCurlyBraceOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = OpenCurlyBraceOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseOpenCurlyBraceOperator
