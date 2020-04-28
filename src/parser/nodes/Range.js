import { NodeTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { findNextRealToken, parseNextNode, testNextNode } from '../util'
import { v4 as uuidv4 } from 'uuid'
import Identifier from './Identifier'
import Literal from './Literal'
import generateTokenList from '../../generator/generateTokenList'
import parseColonOperator from '../pipes/parseColonOperator'
import parseExpression from '../pipes/parseExpression'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const START_PARSERS = [Identifier, Literal]
const parseStartNode = parseNextNode(START_PARSERS)

const parseStart = (props) => {
  const { children, context, prevExpression, tokenList } = props
  if (prevExpression) {
    return {
      ...props,
      children: append(prevExpression, children),
      start: prevExpression
    }
  }
  const start = parseStartNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: test })
  return {
    ...props,
    children: append(start, children),
    start,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

const parseEnd = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  end: expression
}))

const createRange = pipe(
  parseStart,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseEnd,
  ({ children, end, start }) => ({
    children,
    end,
    id: uuidv4(),
    start,
    type: NodeTypes.RANGE
  })
)

const Range = {
  parse: (context, tokenList) => createRange({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      if (!testNextNode(START_PARSERS, context, tokenList)) {
        return false
      }
    }
    const operatorToken = findNextRealToken(tokenList, prevExpression ? 0 : 1)
    return operatorToken.type === TokenTypes.OPERATOR_COLON
  }
}

export default Range
