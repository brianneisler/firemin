import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'

const createServiceStatement = pipe(({ body, children, identifier }) => ({
  body,
  children,
  identifier,
  type: NodeTypes.SERVICE_STATEMENT
}))

const ServiceStatement = {
  parse: (context, tokenList) => createServiceStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.SERVICE
  },
  type: ParserTypes.STATEMENT
}

export default ServiceStatement
