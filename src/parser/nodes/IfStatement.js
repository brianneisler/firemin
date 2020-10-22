import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createIfStatement from '../pipes/createIfStatement'
import expectIfKeyword from '../pipes/expectIfKeyword'
import identifyIfStatementTest from '../pipes/identifyIfStatementTest'
import parseIfKeyword from '../pipes/parseIfKeyword'
import parseIfStatementTest from '../pipes/parseIfStatementTest'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipSemicolonOperator from '../pipes/skipSemicolonOperator'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseIfStatementTokens = pipe(
  parseIfKeyword,
  parseWhitespaceAndComments,
  parseIfStatementTest,
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  createIfStatement
)

const identifyIfStatementChildren = pipe(
  expectIfKeyword,
  skipWhitespaceAndComments,
  identifyIfStatementTest,
  skipWhitespaceAndComments,
  skipSemicolonOperator
)

const IfStatement = {
  identify: (context, node) =>
    createIfStatement({
      ...identifyIfStatementChildren({ children: node.children, context }),
      children: node.children
    }),
  is: (value) => value.type === NodeTypes.IF_STATEMENT,
  parse: (context, tokenList) =>
    parseIfStatementTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_IF
  },
  type: ParserTypes.STATEMENT
}

export default IfStatement
