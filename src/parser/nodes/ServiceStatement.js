import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createServiceStatement from '../pipes/createServiceStatement'
import expectServiceKeyword from '../pipes/expectServiceKeyword'
import identifyBody from '../pipes/identifyBody'
import identifyName from '../pipes/identifyName'
import parseBody from '../pipes/parseBody'
import parseName from '../pipes/parseName'
import parseServiceKeyword from '../pipes/parseServiceKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseServiceStatementTokens = pipe(
  parseServiceKeyword,
  parseWhitespaceAndComments,
  parseName,
  parseWhitespaceAndComments,
  parseBody,
  createServiceStatement
)

const identifyServiceStatementChildren = pipe(
  expectServiceKeyword,
  skipWhitespaceAndComments,
  identifyName,
  skipWhitespaceAndComments,
  identifyBody
)

const ServiceStatement = {
  identify: (context, node) =>
    createServiceStatement({
      ...identifyServiceStatementChildren({ ...node, context }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.SERVICE_STATEMENT,
  parse: (context, tokenList) =>
    parseServiceStatementTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_SERVICE
  },
  type: ParserTypes.STATEMENT
}

export default ServiceStatement
