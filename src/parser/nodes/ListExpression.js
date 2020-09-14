import { append, pipe, slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import parseCloseBracketOperator from '../pipes/parseCloseBracketOperator'
import parseCommaOperator from '../pipes/parseCommaOperator'
import parseOpenBracketOperator from '../pipes/parseOpenBracketOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import {
  findNextRealToken,
  findNextRealTokenIndex,
  parseNextNode
} from '../util'

import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'

const ELEMENT_PARSERS = [Expression, Identifier, Literal]
const parseElementNode = parseNextNode(ELEMENT_PARSERS)

const parseElement = ({ children, context, tokenList, ...rest }) => {
  const element = parseElementNode(context, tokenList)
  children = append(element, children)
  const parsedTokenList = generateTokenList(context, { ast: element })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, element, tokenList }
}

const parseElementAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseElement,
  parseWhitespaceAndComments
)

const parseCommaElementAndWhitespace = pipe(
  parseCommaOperator,
  parseElementAndWhitespace
)

const parseElements = (props) => {
  let { children, context, tokenList } = props
  let elements = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    nextToken.type !== TokenTypes.OPERATOR_CLOSE_BRACKET
  ) {
    let element
    if (first) {
      first = false
      ;({ children, context, element, tokenList } = parseElementAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({
        children,
        context,
        element,
        tokenList
      } = parseCommaElementAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    elements = append(element, elements)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, elements, tokenList }
}

const createListExpression = pipe(
  parseOpenBracketOperator,
  parseWhitespaceAndComments,
  parseElements,
  parseWhitespaceAndComments,
  parseCloseBracketOperator,
  ({ children, elements }) => ({
    children,
    elements,
    id: uuidv4(),
    type: NodeTypes.LIST_EXPRESSION
  })
)

const ListExpression = {
  parse: (context, tokenList) =>
    createListExpression({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a ComputedMemberExpression
      return false
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList)
    )
    return (
      operatorToken && operatorToken.type === TokenTypes.OPERATOR_OPEN_BRACKET
    )
  },
  type: ParserTypes.EXPRESSION
}

export default ListExpression
