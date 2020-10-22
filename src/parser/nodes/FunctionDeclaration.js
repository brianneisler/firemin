import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createFunctionDeclaration from '../pipes/createFunctionDeclaration'
import expectFunctionKeyword from '../pipes/expectFunctionKeyword'
import identifyBody from '../pipes/identifyBody'
import identifyIdentifier from '../pipes/identifyIdentifier'
import identifyParams from '../pipes/identifyParams'
import parseBody from '../pipes/parseBody'
import parseFunctionKeyword from '../pipes/parseFunctionKeyword'
import parseIdentifier from '../pipes/parseIdentifier'
import parseParams from '../pipes/parseParams'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseFunctionDelcarationTokens = pipe(
  parseFunctionKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseParams,
  parseWhitespaceAndComments,
  parseBody,
  createFunctionDeclaration
)
const identifyFunctionDeclarationChildren = pipe(
  expectFunctionKeyword,
  skipWhitespaceAndComments,
  identifyIdentifier,
  skipWhitespaceAndComments,
  identifyParams,
  skipWhitespaceAndComments,
  identifyBody
)

const FunctionDeclaration = {
  identify: (context, node) =>
    createFunctionDeclaration({
      ...identifyFunctionDeclarationChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.FUNCTION_DECLARATION,
  parse: (context, tokenList) =>
    parseFunctionDelcarationTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_FUNCTION
  },
  type: ParserTypes.DECLARATION
}

export default FunctionDeclaration
