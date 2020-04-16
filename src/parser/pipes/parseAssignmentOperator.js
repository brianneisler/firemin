import { append, slice } from 'ramda'
import AssignmentOperator from '../nodes/AssignmentOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseAssignmentOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = AssignmentOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseAssignmentOperator
