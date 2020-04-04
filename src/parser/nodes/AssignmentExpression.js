import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex, parseNextNode } from '../util'
import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'
import generateTokenList from '../../generator/generateTokenList'
import parseOperator from '../pipes/parseOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

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

const RIGHT_PARSERS = [Expression, Identifier, Literal]

// NOTE BRN: Right can be another Expression
const parseRight = ({ children, context, tokenList, ...rest }) => {
  const right = parseNextNode(context, tokenList, RIGHT_PARSERS)
  const parsedTokenList = generateTokenList(context, { ast: right })
  return {
    ...rest,
    children: append(right, children),
    right,
    tokenList: slice(0, parsedTokenList.size(), tokenList)
  }
}

const parseAssignmentExpression = pipe(
  parseLeft,
  parseWhitespaceAndComments,
  parseOperator,
  parseWhitespaceAndComments,
  parseRight
)

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
  test: (context, tokenList) => {
    // The first real token will be the identifier (can only be a single identifier
    // in firestore rules)
    const identifierToken = findNextRealToken(tokenList)
    if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
      return false
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList))
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_ASSIGNMENT
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  type: ParserTypes.EXPRESSION
}

export default AssignmentExpression
