import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import parseArgument from '../pipes/parseArgument'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseReturnKeyword from '../pipes/parseReturnKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createReturnStatement = pipe(
  parseReturnKeyword,
  parseWhitespaceAndComments,
  parseArgument,
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  ({ argument, children }) => ({
    argument,
    children,
    id: uuidv4(),
    type: NodeTypes.RETURN_STATEMENT
  })
)

const ReturnStatement = {
  parse: (context, tokenList) => createReturnStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_RETURN
  },
  type: ParserTypes.STATEMENT
}

export default ReturnStatement
