import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createConditionalExpression from '../pipes/createConditionalExpression'
import expectColonOperator from '../pipes/expectColonOperator'
import expectQuestionMarkOperator from '../pipes/expectQuestionMarkOperator'
import identifyAlternate from '../pipes/identifyAlternate'
import identifyConsequent from '../pipes/identifyConsequent'
import identifyTest from '../pipes/identifyTest'
import parseAlternate from '../pipes/parseAlternate'
import parseColonOperator from '../pipes/parseColonOperator'
import parseConsequent from '../pipes/parseConsequent'
import parseQuestionMarkOperator from '../pipes/parseQuestionMarkOperator'
import parseTest from '../pipes/parseTest'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import {
  findNextRealToken,
  findNextRealTokenIndex,
  testNextNode
} from '../util'

import Identifier from './Identifier'
import Literal from './Literal'

const TEST_PARSERS = [Identifier, Literal]

const parseConditionalExpressionTokens = pipe(
  parseTest,
  parseWhitespaceAndComments,
  parseQuestionMarkOperator,
  parseWhitespaceAndComments,
  parseConsequent,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseAlternate,
  createConditionalExpression
)

const identifyConditionalExpressionChildren = pipe(
  identifyTest,
  skipWhitespaceAndComments,
  expectQuestionMarkOperator,
  skipWhitespaceAndComments,
  identifyConsequent,
  skipWhitespaceAndComments,
  expectColonOperator,
  skipWhitespaceAndComments,
  identifyAlternate
)

const ConditionalExpression = {
  identify: (context, node) =>
    createConditionalExpression({
      ...identifyConditionalExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.CONDITIONAL_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) =>
    parseConditionalExpressionTokens({
      children: [],
      context,
      prevExpression,
      tokenList
    }),
  test: (context, tokenList, prevExpression = null) => {
    if (!prevExpression) {
      if (!testNextNode(TEST_PARSERS, context, tokenList)) {
        return false
      }
    }
    const operatorToken = findNextRealToken(
      tokenList,
      findNextRealTokenIndex(tokenList) + (prevExpression ? 0 : 1)
    )
    return (
      operatorToken && operatorToken.type === TokenTypes.OPERATOR_QUESTION_MARK
    )
  },
  type: ParserTypes.EXPRESSION
}

export default ConditionalExpression
