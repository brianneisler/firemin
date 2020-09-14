import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import EqualityOperator from '../nodes/EqualityOperator'

const parseEqualityOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = EqualityOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseEqualityOperator
