import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { findNextRealToken, findNextRealTokenIndex } from '../util'
import { has, pipe } from 'ramda'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseExpression from '../pipes/parseExpression'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parsePathPartWord = (props) => {
  const { children, tokenList } = props
}

const createPathPartKeyword = pipe(
  parseDivideOperator,
  parsePathPartWord,
  parseExpression,
  parseWhitespaceAndComments,
  parseCloseParenthesisOperator,
  ({ children, expression }) => ({
    children,
    expression,
    type: NodeTypes.PARENTHESES_EXPRESSION
  })
)

const PATH_PART_KEYWORD_TOKEN_TYPES = {
  [TokenTypes.IDENTIFIER]: true,
  [TokenTypes.KEYWORD_ALLOW]: true,
  [TokenTypes.KEYWORD_FUNCTION]: true,
  [TokenTypes.KEYWORD_IF]: true,
  [TokenTypes.KEYWORD_IS]: true,
  [TokenTypes.KEYWORD_LET]: true,
  [TokenTypes.KEYWORD_MATCH]: true,
  [TokenTypes.KEYWORD_RETURN]: true,
  [TokenTypes.KEYWORD_SERVICE]: true,
  [TokenTypes.OPERATOR_UNARY_MINUS]: true,
  [TokenTypes.OPERATOR_AT_SIGN]: true
}

const PathPartWord = {
  parse: (context, tokenList) => createPathPartKeyword({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a BinaryExpress with a DivideOperator
      return false
    }
    const firstToken = tokenList.get(0)
    const secondToken = tokenList.get(1)
    return (
      firstToken &&
      firstToken.type === TokenTypes.OPERATOR_DIVIDE &&
      secondToken &&
      has(secondToken.type, PATH_PART_KEYWORD_TOKEN_TYPES)
    )
  }
}

export default PathPartWord
