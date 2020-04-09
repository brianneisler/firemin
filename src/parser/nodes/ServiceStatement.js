import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseBody from '../pipes/parseBody'
import parseExpression from '../pipes/parseExpression'
import parseServiceKeyword from '../pipes/parseServiceKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseId = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  id: expression
}))

const createServiceStatement = pipe(
  parseServiceKeyword,
  parseWhitespaceAndComments,
  parseId,
  parseWhitespaceAndComments,
  parseBody,
  ({ body, children, id }) => ({
    body,
    children,
    id,
    type: NodeTypes.SERVICE_STATEMENT
  })
)

const ServiceStatement = {
  parse: (context, tokenList) => createServiceStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_SERVICE
  },
  type: ParserTypes.STATEMENT
}

export default ServiceStatement
