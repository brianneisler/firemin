import { append, slice } from 'ramda'
import InequalityOperator from '../nodes/InequalityOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseInequalityOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = InequalityOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseInequalityOperator
