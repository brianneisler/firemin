import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, findNextRealTokenIndex, parseNextNode } from '../util'
import Expression from './Expression'
import Identifier from './Identifier'
import generateTokenList from '../../generator/generateTokenList'
import parseDotOperator from '../pipes/parseDotOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseObject = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      object: prevExpression
    }
  }

  const object = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: object })
  return {
    ...props,
    children: append(object, children),
    object,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

const PROPERTY_PARSERS = [Expression, Identifier]
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

const createStaticMemberExpression = pipe(
  parseObject,
  parseWhitespaceAndComments,
  parseDotOperator,
  parseWhitespaceAndComments,
  parseProperty,
  ({ children, object, property }) => ({
    children,
    object,
    property,
    type: NodeTypes.STATIC_MEMBER_EXPRESSION
  })
)

const StaticMemberExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createStaticMemberExpression({
      children: [],
      context,
      prevExpression,
      tokenList
    }),

  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      const identifierToken = findNextRealToken(tokenList)
      if (!identifierToken || identifierToken.type !== TokenTypes.IDENTIFIER) {
        return false
      }
    }
    const operatorToken = findNextRealToken(tokenList, findNextRealTokenIndex(tokenList) + 1)
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_DOT
  },

  type: ParserTypes.EXPRESSION
}

export default StaticMemberExpression
