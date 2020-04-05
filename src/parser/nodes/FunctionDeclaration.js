import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseBlockStatement from '../pipes/parseBlockStatement'
import parseFunctionKeyword from '../pipes/parseFunctionKeyword'
import parseFunctionParameters from '../pipes/parseFunctionParameters'
import parseIdentifier from '../pipes/parseIdentifier'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseParams = pipe(parseFunctionParameters, ({ functionParameters, ...rest }) => ({
  ...rest,
  params: functionParameters.params
}))

const parseBody = pipe(parseBlockStatement, ({ blockStatement, ...rest }) => ({
  ...rest,
  body: blockStatement
}))

const createFunctionDelcaration = pipe(
  parseFunctionKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseParams,
  parseWhitespaceAndComments,
  parseBody,
  ({ body, children, identifier, params }) => ({
    body,
    children,
    identifier,
    params,
    type: NodeTypes.FUNCTION_DECLARATION
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
