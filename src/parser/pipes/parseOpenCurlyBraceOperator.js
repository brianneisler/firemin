import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import OpenCurlyBraceOperator from '../nodes/OpenCurlyBraceOperator'

const parseOpenCurlyBraceOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = OpenCurlyBraceOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseOpenCurlyBraceOperator
