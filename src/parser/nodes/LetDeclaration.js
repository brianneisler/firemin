import { append, pipe, slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import parseAssignmentOperator from '../pipes/parseAssignmentOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseLetKeyword from '../pipes/parseLetKeyword'
import parseOptionalSemicolonOperator from '../pipes/parseOptionalSemicolonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import { parseNextNode } from '../util'

import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'

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
  parseWhitespaceAndComments,
  parseOptionalSemicolonOperator,
  ({ children, identifier, init, operator }) => ({
    children,
    id: uuidv4(),
    identifier,
    init,
    operator,
    type: NodeTypes.LET_DECLARATION
  })
)

const LetDeclaration = {
  parse: (context, tokenList) =>
    createLetDelcaration({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_LET
  },
  type: ParserTypes.DECLARATION
}

export default LetDeclaration
