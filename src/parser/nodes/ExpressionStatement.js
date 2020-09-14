import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes } from '../../constants'
import parseExpression from '../pipes/parseExpression'
import parseSemicolonOperator from '../pipes/parseSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import testNextNode from '../util/testNextNode'

import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'

const EXPRESSION_STATEMENT_PARSERS = [Expression, Identifier, Literal]

const createExpressionStatement = pipe(
  parseExpression,
  parseWhitespaceAndComments,
  parseSemicolonOperator,
  ({ children, expression }) => ({
    children,
    expression,
    id: uuidv4(),
    type: NodeTypes.EXPRESSION_STATEMENT
  })
)

const ExpressionStatement = {
  parse: (context, tokenList) =>
    createExpressionStatement({ children: [], context, tokenList }),

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) =>
    testNextNode(EXPRESSION_STATEMENT_PARSERS, context, tokenList),
  type: ParserTypes.STATEMENT
}

export default ExpressionStatement
