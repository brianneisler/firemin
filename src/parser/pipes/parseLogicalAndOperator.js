import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import LogicalAndOperator from '../nodes/LogicalAndOperator'

const parseLogicalAndOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LogicalAndOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLogicalAndOperator
