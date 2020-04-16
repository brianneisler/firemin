import { append, slice } from 'ramda'
import IsOperator from '../nodes/IsOperator'
import generateTokenList from '../../generator/generateTokenList'

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
