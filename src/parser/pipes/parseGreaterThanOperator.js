import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import GreaterThanOperator from '../nodes/GreaterThanOperator'

const parseGreaterThanOperator = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  const operator = GreaterThanOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseGreaterThanOperator
