import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import LogicalNotOperator from '../nodes/LogicalNotOperator'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'
import UnaryPlusOperator from '../nodes/UnaryPlusOperator'
import parseNextNode from '../util/parseNextNode'

const UNARY_OPERATOR_PARSERS = [
  LogicalNotOperator,
  UnaryMinusOperator,
  UnaryPlusOperator
]

const parseUnaryOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = parseNextNode(UNARY_OPERATOR_PARSERS, context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseUnaryOperator
