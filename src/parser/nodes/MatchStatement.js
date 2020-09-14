import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import parseBody from '../pipes/parseBody'
import parseMatchKeyword from '../pipes/parseMatchKeyword'
import parsePath from '../pipes/parsePath'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createMatchStatement = pipe(
  parseMatchKeyword,
  parseWhitespaceAndComments,
  parsePath,
  parseWhitespaceAndComments,
  parseBody,
  ({ body, children, path }) => ({
    body,
    children,
    path,
    type: NodeTypes.MATCH_STATEMENT
  })
)

const MatchStatement = {
  parse: (context, tokenList) =>
    createMatchStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_MATCH
  },
  type: ParserTypes.STATEMENT
}

export default MatchStatement
