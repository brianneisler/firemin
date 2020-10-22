import { pipe } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createRange from '../pipes/createRange'
import expectColonOperator from '../pipes/expectColonOperator'
import identifyEnd from '../pipes/identifyEnd'
import identifyStart from '../pipes/identifyStart'
import parseColonOperator from '../pipes/parseColonOperator'
import parseEnd from '../pipes/parseEnd'
import parseStart from '../pipes/parseStart'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import { findNextRealToken, testNextNode } from '../util'

import Identifier from './Identifier'
import Literal from './Literal'

const START_PARSERS = [Identifier, Literal]

const parseRangeTokens = pipe(
  parseStart,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseEnd,
  createRange
)

const identifyRangeChildren = pipe(
  identifyStart,
  skipWhitespaceAndComments,
  expectColonOperator,
  skipWhitespaceAndComments,
  identifyEnd
)

const Range = {
  identify: (context, node) =>
    createRange({
      ...identifyRangeChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.RANGE,
  parse: (context, tokenList) =>
    parseRangeTokens({ children: [], context, tokenList }),
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
