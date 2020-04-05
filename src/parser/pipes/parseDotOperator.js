import { append, slice } from 'ramda'
import DotOperator from '../nodes/DotOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseDotOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = DotOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseDotOperator
