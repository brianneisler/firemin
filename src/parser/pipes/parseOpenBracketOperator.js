import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import OpenBracketOperator from '../nodes/OpenBracketOperator'

const parseOpenBracketOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = OpenBracketOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseOpenBracketOperator
