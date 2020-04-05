import { append, slice } from 'ramda'
import AssignmentOperator from '../nodes/AssignmentOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseAssignmentOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = AssignmentOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    operator,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseAssignmentOperator
