import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import LogicalNotOperator from '../nodes/LogicalNotOperator'

const parseLogicalNotOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LogicalNotOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLogicalNotOperator
