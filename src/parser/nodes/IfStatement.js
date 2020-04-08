import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'

const createIfStatement = pipe(
  // TODO
  ({ children, consequent, test }) => ({
    children,
    consequent,
    test,
    type: NodeTypes.IF_STATEMENT
  })
)

const IfStatement = {
  parse: (context, tokenList) => createIfStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.IF
  },
  type: ParserTypes.STATEMENT
}

export default IfStatement
