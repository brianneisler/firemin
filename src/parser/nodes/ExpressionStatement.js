import { pipe } from 'ramda'

import { NodeTypes, ParserTypes } from '../../constants'
import createExpressionStatement from '../pipes/createExpressionStatement'
import expectSemicolonOperator from '../pipes/expectSemicolonOperator'
import identifyExpression from '../pipes/identifyExpression'
import parseExpression from '../pipes/parseExpression'
import parseSemicolonOperator from '../pipes/parseSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'
import testNextNode from '../util/testNextNode'

import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'

const EXPRESSION_STATEMENT_PARSERS = [Expression, Identifier, Literal]

const parseExpressionStatementTokens = pipe(
  parseExpression,
  parseWhitespaceAndComments,
  parseSemicolonOperator,
  createExpressionStatement
)

const identifyExpressionStatementChildren = pipe(
  identifyExpression,
  skipWhitespaceAndComments,
  expectSemicolonOperator
)

const ExpressionStatement = {
  identify: (context, node) =>
    createExpressionStatement({
      ...identifyExpressionStatementChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.EXPRESSION_STATEMENT,

  parse: (context, tokenList) =>
    parseExpressionStatementTokens({ children: [], context, tokenList }),

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) =>
    testNextNode(EXPRESSION_STATEMENT_PARSERS, context, tokenList),
  type: ParserTypes.STATEMENT
}

export default ExpressionStatement
