import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createMatchStatement from '../pipes/createMatchStatement'
import expectMatchKeyword from '../pipes/expectMatchKeyword'
import identifyBody from '../pipes/identifyBody'
import identifyPath from '../pipes/identifyPath'
import parseBody from '../pipes/parseBody'
import parseMatchKeyword from '../pipes/parseMatchKeyword'
import parsePath from '../pipes/parsePath'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseMatchStatementTokens = pipe(
  parseMatchKeyword,
  parseWhitespaceAndComments,
  parsePath,
  parseWhitespaceAndComments,
  parseBody,
  createMatchStatement
)

const identifyMatchStatementChildren = pipe(
  expectMatchKeyword,
  skipWhitespaceAndComments,
  identifyPath,
  skipWhitespaceAndComments,
  identifyBody
)

const MatchStatement = {
  identify: (context, node) =>
    createMatchStatement({
      ...identifyMatchStatementChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.MATCH_STATEMENT,
  parse: (context, tokenList) =>
    parseMatchStatementTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_MATCH
  },
  type: ParserTypes.STATEMENT
}

export default MatchStatement
