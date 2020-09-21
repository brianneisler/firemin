import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import parseColonOperator from '../pipes/parseColonOperator'
import parseExpression from '../pipes/parseExpression'
import parseQuestionMarkOperator from '../pipes/parseQuestionMarkOperator'
import parseTest from '../pipes/parseTest'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import {
  findNextRealToken,
  findNextRealTokenIndex,
  testNextNode
} from '../util'

import Identifier from './Identifier'
import Literal from './Literal'

const TEST_PARSERS = [Identifier, Literal]

const parseConsequent = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  consequent: expression
}))

const parseAlternate = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  alternate: expression
}))

const createConditionalExpression = pipe(
  parseTest,
  parseWhitespaceAndComments,
  parseQuestionMarkOperator,
  parseWhitespaceAndComments,
  parseConsequent,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseAlternate,
  ({ alternate, children, consequent, test }) => ({
    alternate,
    children,
    consequent,
    id: uuidv4(),
    test,
    type: NodeTypes.CONDITIONAL_EXPRESSION
  })
)

const ConditionalExpression = {
  parse: (context, tokenList, prevExpression = null) =>
    createConditionalExpression({
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
