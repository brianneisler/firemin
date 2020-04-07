import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseArgument from '../pipes/parseArgument'
import parseReturnKeyword from '../pipes/parseReturnKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createReturnStatement = pipe(
  parseReturnKeyword,
  parseWhitespaceAndComments,
  parseArgument,
  ({ argument, children }) => ({
    argument,
    children,
    type: NodeTypes.RETURN_STATEMENT
  })
)

const ReturnStatement = {
  parse: (context, tokenList) => createReturnStatement({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.RETURN
  },
  type: ParserTypes.STATEMENT
}

export default ReturnStatement
