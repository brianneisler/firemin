import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import LogicalOrOperator from '../nodes/LogicalOrOperator'

const parseLogicalOrOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LogicalOrOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLogicalOrOperator
