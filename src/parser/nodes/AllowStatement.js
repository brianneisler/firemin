import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseAllowKeyword from '../pipes/parseAllowKeyword'
import parseColonOperator from '../pipes/parseColonOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseIfStatement from '../pipes/parseIfStatement'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseCondition = pipe(parseIfStatement, ({ statement, ...rest }) => ({
  ...rest,
  condition: statement
}))

const parsePermission = pipe(parseIdentifier, ({ identifier, ...rest }) => ({
  ...rest,
  permission: identifier
}))

const createAllowStatement = pipe(
  parseAllowKeyword,
  parseWhitespaceAndComments,
  parsePermission,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseCondition,
  ({ children, condition, permission }) => ({
    children,
    condition,
    permission,
    type: NodeTypes.ALLOW_STATEMENT
  })
)

const AllowStatement = {
  parse: (context, tokenList) => createAllowStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_ALLOW
  },
  type: ParserTypes.STATEMENT
}

export default AllowStatement
