import { append, slice } from 'ramda'
import LogicalOrOperator from '../nodes/LogicalOrOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseLogicalOrOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = LogicalOrOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseLogicalOrOperator
