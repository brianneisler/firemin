import { NodeTypes, ParserTypes } from '../../constants'
import { pipe } from 'ramda'
import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'
import parseExpression from '../pipes/parseExpression'
import parseSemicolonOperator from '../pipes/parseSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import testNextNode from '../util/testNextNode'

const EXPRESSION_STATEMENT_PARSERS = [Expression, Identifier, Literal]

const createExpressionStatement = pipe(
  parseExpression,
  parseWhitespaceAndComments,
  parseSemicolonOperator,
  ({ children, expression }) => ({
    children,
    expression,
    type: NodeTypes.EXPRESSION_STATEMENT
  })
)

const ExpressionStatement = {
  parse: (context, tokenList) => createExpressionStatement({ children: [], context, tokenList }),

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(EXPRESSION_STATEMENT_PARSERS, context, tokenList),
  type: ParserTypes.STATEMENT
}

export default ExpressionStatement
