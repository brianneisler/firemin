import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createLetDeclaration from '../pipes/createLetDeclaration'
import expectAssignmentOperator from '../pipes/expectAssignmentOperator'
import expectLetKeyword from '../pipes/expectLetKeyword'
import identifyIdentifier from '../pipes/identifyIdentifier'
import identifyInit from '../pipes/identifyInit'
import parseAssignmentOperator from '../pipes/parseAssignmentOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseInit from '../pipes/parseInit'
import parseLetKeyword from '../pipes/parseLetKeyword'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipSemicolonOperator from '../pipes/skipSemicolonOperator'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseLetDelcarationTokens = pipe(
  parseLetKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseAssignmentOperator,
  parseWhitespaceAndComments,
  parseInit,
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  createLetDeclaration
)

const identifyLetDeclarationChildren = pipe(
  expectLetKeyword,
  skipWhitespaceAndComments,
  identifyIdentifier,
  skipWhitespaceAndComments,
  expectAssignmentOperator,
  skipWhitespaceAndComments,
  identifyInit,
  skipWhitespaceAndComments,
  skipSemicolonOperator
)

const LetDeclaration = {
  identify: (context, node) =>
    createLetDeclaration({
      ...identifyLetDeclarationChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.LET_DECLARATION,
  parse: (context, tokenList) =>
    parseLetDelcarationTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_LET
  },
  type: ParserTypes.DECLARATION
}

export default LetDeclaration
