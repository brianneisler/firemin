import { append, slice } from 'ramda'
import Operator from '../nodes/Operator'
import generateTokenList from '../../generator/generateTokenList'

const parseOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = Operator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size(), tokenList)
  }
}

export default parseOperator
