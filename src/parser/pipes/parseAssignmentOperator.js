import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import AssignmentOperator from '../nodes/AssignmentOperator'

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
