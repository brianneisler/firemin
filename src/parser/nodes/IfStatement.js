import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseExpression from '../pipes/parseExpression'
import parseIfKeyword from '../pipes/parseIfKeyword'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseTest = pipe(parseExpression, ({ expresion, ...rest }) => ({
  ...rest,
  test: expresion
}))

const createIfStatement = pipe(
  parseIfKeyword,
  parseWhitespaceAndComments,
  parseTest,
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  ({ children, test }) => ({
    children,
    test,
    type: NodeTypes.IF_STATEMENT
  })
)

const IfStatement = {
  parse: (context, tokenList) => createIfStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_IF
  },
  type: ParserTypes.STATEMENT
}

export default IfStatement
