import { append, pipe, slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import parseDotOperator from '../pipes/parseDotOperator'
import parseObject from '../pipes/parseObject'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import { findNextRealToken, findNextRealTokenIndex } from '../util'

import Identifier from './Identifier'

const parseStaticProperty = (props) => {
  const { children, context, tokenList } = props
  const property = Identifier.parse(context, tokenList)
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
  parseStaticProperty,
  ({ children, object, property }) => ({
    children,
    id: uuidv4(),
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
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return operatorToken && operatorToken.type === TokenTypes.OPERATOR_DOT
  },

  type: ParserTypes.EXPRESSION
}

export default StaticMemberExpression
