import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex } from '../util'
import { v4 as uuidv4 } from 'uuid'
import Identifier from './Identifier'
import generateTokenList from '../../generator/generateTokenList'
import parseAssignmentOperator from '../pipes/parseAssignmentOperator'
import parseRight from '../pipes/parseRight'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

// NOTE BRN: The left of an AssignmentExpression MUST be an identifier
const parseLeft = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      left: prevExpression
    }
  }
  const left = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: left })
  return {
    ...props,
    children: append(left, children),
    left,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

const createAssignmentExpression = pipe(
  parseLeft,
  parseWhitespaceAndComments,
  parseAssignmentOperator,
  parseWhitespaceAndComments,
  parseRight,
  ({ children, left, operator, right }) => ({
    children,
    id: uuidv4(),
    left,
    operator,
    right,
    type: NodeTypes.ASSIGNMENT_EXPRESSION
  })
)

const AssignmentExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createAssignmentExpression({
      children: [],
      context,
      prevExpression,
      tokenList
    }),

  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      // The first real token will be the identifier (can only be a single identifier
      // in firestore rules)
      const identifierToken = findNextRealToken(tokenList)
      if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_ASSIGNMENT
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  type: ParserTypes.EXPRESSION
}

export default AssignmentExpression
