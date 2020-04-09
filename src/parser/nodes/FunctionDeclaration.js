import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { append, pipe } from 'ramda'
import parseBody from '../pipes/parseBody'
import parseCloseParenthesisOperator from '../pipes/parseCloseParenthesisOperator'
import parseCommaOperator from '../pipes/parseCommaOperator'
import parseFunctionKeyword from '../pipes/parseFunctionKeyword'
import parseIdentifier from '../pipes/parseIdentifier'
import parseOpenParenthesisOperator from '../pipes/parseOpenParenthesisOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const parseParam = pipe(parseIdentifier, ({ identifier, ...rest }) => ({
  param: identifier,
  ...rest
}))

const parseParamAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parseParam,
  parseWhitespaceAndComments
)

const parseCommaParamAndWhitespace = pipe(parseCommaOperator, parseParamAndWhitespace)

const parseCommaSeparatedParams = (props) => {
  let { children, context, tokenList } = props
  let params = []
  let first = true
  let nextToken = tokenList.get(0)
  while (tokenList.size > 0 && nextToken.type !== TokenTypes.OPERATOR_CLOSE_PARENTHESIS) {
    let param
    if (first) {
      first = false
      ;({ children, context, param, tokenList } = parseParamAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({ children, context, param, tokenList } = parseCommaParamAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    params = append(param, params)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, params, tokenList }
}

const parseParams = pipe(
  parseOpenParenthesisOperator,
  parseCommaSeparatedParams,
  parseCloseParenthesisOperator
)

const createFunctionDelcaration = pipe(
  parseFunctionKeyword,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseWhitespaceAndComments,
  parseParams,
  parseWhitespaceAndComments,
  parseBody,
  ({ body, children, identifier, params }) => ({
    body,
    children,
    identifier,
    params,
    type: NodeTypes.FUNCTION_DECLARATION
  })
)

const FunctionDeclaration = {
  parse: (context, tokenList) => createFunctionDelcaration({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_FUNCTION
  },
  type: ParserTypes.DECLARATION
}

export default FunctionDeclaration
