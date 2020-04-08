import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'

const createMatchStatement = pipe(({ body, children, path }) => ({
  body,
  children,
  path,
  type: NodeTypes.MATCH_STATEMENT
}))

const MatchStatement = {
  parse: (context, tokenList) => createMatchStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_MATCH
  },
  type: ParserTypes.STATEMENT
}

export default MatchStatement
