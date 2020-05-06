import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex, parseNextNode } from '../util'
import { v4 as uuidv4 } from 'uuid'
import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'
import Range from './Range'
import generateTokenList from '../../generator/generateTokenList'
import parseCloseBracketOperator from '../pipes/parseCloseBracketOperator'
import parseObject from '../pipes/parseObject'
import parseOpenBracketOperator from '../pipes/parseOpenBracketOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const PROPERTY_PARSERS = [Range, Expression, Identifier, Literal]
const parsePropertyNode = parseNextNode(PROPERTY_PARSERS)

const parseProperty = (props) => {
  const { children, context, tokenList } = props
  const property = parsePropertyNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: property })
  return {
    ...props,
    children: append(property, children),
    property,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

const createComputedMemberExpression = pipe(
  parseObject,
  parseWhitespaceAndComments,
  parseOpenBracketOperator,
  parseWhitespaceAndComments,
  parseProperty,
  parseWhitespaceAndComments,
  parseCloseBracketOperator,
  ({ children, object, property }) => ({
    children,
    id: uuidv4(),
    object,
    property,
    type: NodeTypes.COMPUTED_MEMBER_EXPRESSION
  })
)

const ComputedMemberExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createComputedMemberExpression({ children: [], context, prevExpression, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      const identifierToken = findNextRealToken(tokenList)
      if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_BRACKET
  },
  type: ParserTypes.EXPRESSION
}

export default ComputedMemberExpression
