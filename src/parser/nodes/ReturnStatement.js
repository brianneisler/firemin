import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createReturnStatement from '../pipes/createReturnStatement'
import expectReturnKeyword from '../pipes/expectReturnKeyword'
import identifyArgument from '../pipes/identifyArgument'
import parseArgument from '../pipes/parseArgument'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseReturnKeyword from '../pipes/parseReturnKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipSemicolonOperator from '../pipes/skipSemicolonOperator'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseReturnStatementTokens = pipe(
  parseReturnKeyword,
  parseWhitespaceAndComments,
  parseArgument,
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  createReturnStatement
)

const identifyReturnStatementChildren = pipe(
  expectReturnKeyword,
  skipWhitespaceAndComments,
  identifyArgument,
  skipWhitespaceAndComments,
  skipSemicolonOperator
)

const ReturnStatement = {
  identify: (context, node) => {
    return createReturnStatement({
      ...identifyReturnStatementChildren({ ...node, context }),
      children: node.children
    })
  },
  is: (value) => value.type === NodeTypes.RETURN_STATEMENT,
  parse: (context, tokenList) =>
    parseReturnStatementTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_RETURN
  },
  type: ParserTypes.STATEMENT
}

export default ReturnStatement
