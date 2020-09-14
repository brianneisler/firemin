import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Operator from '../nodes/Operator'

const parseOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = Operator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseOperator
