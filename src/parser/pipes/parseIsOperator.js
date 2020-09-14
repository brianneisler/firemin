import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import IsOperator from '../nodes/IsOperator'

const parseIsOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = IsOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseIsOperator
