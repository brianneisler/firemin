import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import DotOperator from '../nodes/DotOperator'

const parseDotOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = DotOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseDotOperator
