import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'

const createAllowStatement = pipe(({ children, expression, permission }) => ({
  children,
  expression,
  permission,
  type: NodeTypes.ALLOW_STATEMENT
}))

const AllowStatement = {
  parse: (context, tokenList) => createAllowStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.ALLOW
  },
  type: ParserTypes.STATEMENT
}

export default AllowStatement
