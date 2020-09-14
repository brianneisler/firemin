import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import GreaterThanEqualOperator from '../nodes/GreaterThanEqualOperator'

const parseGreaterThanEqualOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = GreaterThanEqualOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseGreaterThanEqualOperator
