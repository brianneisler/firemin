import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import InequalityOperator from '../nodes/InequalityOperator'

const parseInequalityOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = InequalityOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseInequalityOperator
