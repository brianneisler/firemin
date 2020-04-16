import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import parseBody from '../pipes/parseBody'
import parseExpression from '../pipes/parseExpression'
import parseServiceKeyword from '../pipes/parseServiceKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseName = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  name: expression
}))

const createServiceStatement = pipe(
  parseServiceKeyword,
  parseWhitespaceAndComments,
  parseName,
  parseWhitespaceAndComments,
  parseBody,
  ({ body, children, name }) => ({
    body,
    children,
    id: uuidv4(),
    name,
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
