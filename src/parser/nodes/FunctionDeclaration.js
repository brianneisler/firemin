import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import parseBlockStatement from '../pipes/parseBlockStatement'
import parseFunctionKeyword from '../pipes/parseFunctionKeyword'
import parseFunctionParameters from '../pipes/parseFunctionParameters'
import parseIdentifier from '../pipes/parseIdentifier'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseParams = ({ children, context, tokenList, ...rest }) => {
  const init = parseNextNode(context, tokenList, INIT_PARSERS)
  const parsedTokenList = generateTokenList(context, { ast: init })
  return {
    ...rest,
    children: append(init, children),
    init,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

const parseBody = () => {}

const createFunctionDelcaration = pipe(
  parseFunctionKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseFunctionParameters,
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
