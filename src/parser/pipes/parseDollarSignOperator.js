import { append, slice } from 'ramda'
import DollarSignOperator from '../nodes/DollarSignOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseDollarSignOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = DollarSignOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseDollarSignOperator
