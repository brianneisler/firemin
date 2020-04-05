import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'

const createFunctionDelcaration = pipe(
  parseLetKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseAssignmentOperator,
  parseWhitespaceAndComments,
  parseInit,
  ({ children, identifier, init, operator }) => ({
    children,
    identifier,
    init,
    operator,
    type: NodeTypes.LET_DECLARATION
  })
)

const FunctionDeclaration = {
  parse: (context, tokenList) => createFunctionDelcaration({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.FUNCTION
  },
  type: ParserTypes.DECLARATION
}

export default FunctionDeclaration
