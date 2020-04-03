import { NodeTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken } from '../util'
import Identifier from './Identifier'
import generateTokenList from '../../generator/generateTokenList'
import parseWhitespaceAndComments from '../parseWhitespaceAndComments'

const parseLeft = ({ children, context, tokenList, ...rest }) => {
  const left = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: left })
  return {
    ...rest,
    children: append(left, children),
    left,
    tokenList: slice(0, parsedTokenList.size(), tokenList)
  }
}

const parseOperator

const parseAssignmentExpression = pipe(parseLeft, parseWhitespaceAndComments, parseOperator, parseWhitespaceAndComments, parseRight)

const AssignmentExpression = {
  parse: (context, tokenList) => {
    const { children, left, operator, right } = parseAssignmentExpression({
      children: [],
      context,
      tokenList
    })

    return {
      children,
      left,
      operator,
      right,
      type: NodeTypes.ASSIGNMENT_EXPRESSION
    }
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (tokenList) => {
    const nextToken = findNextRealToken(tokenList)
    return nextToken && nextToken.type === TokenTypes.OPERATOR_ASSIGNMENT
  }
}

export default AssignmentExpression
