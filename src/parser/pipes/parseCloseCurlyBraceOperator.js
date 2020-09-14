import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import CloseCurlyBraceOperator from '../nodes/CloseCurlyBraceOperator'

const parseCloseCurlyBraceOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = CloseCurlyBraceOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseCloseCurlyBraceOperator
