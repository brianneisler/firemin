import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { generateTokenList, parseNextNode } from '../util'
import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'
import parseAssignmentOperator from '../pipes/parseAssignmentOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseLetKeyword from '../pipes/parseLetKeyword'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const INIT_PARSERS = [Expression, Identifier, Literal]
const parseInitNode = parseNextNode(INIT_PARSERS)

const parseInit = (props) => {
  const { children, context, tokenList } = props
  const init = parseInitNode(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: init })
  return {
    ...props,
    children: append(init, children),
    init,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

const createLetDelcaration = pipe(
  parseLetKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseAssignmentOperator,
  parseWhitespaceAndComments,
  parseInit,
  ({ children, identifier, init, operator }) => ({
    children,
    identifier,
    init,
    operator,
    type: NodeTypes.LET_DECLARATION
  })
)

const LetDeclaration = {
  parse: (context, tokenList) => createLetDelcaration({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === Keywords.LET
  },
  type: ParserTypes.DECLARATION
}

export default LetDeclaration
