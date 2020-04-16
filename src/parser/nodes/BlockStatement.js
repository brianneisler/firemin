import { NodeTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import parseBodyUntil from '../pipes/parseBodyUntil'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'

const createBlockStatement = pipe(
  parseOpenCurlyBraceOperator,
  parseBodyUntil(
    ({ tokenList }) => tokenList.get(0).type !== TokenTypes.OPERATOR_CLOSE_CURLY_BRACE
  ),
  parseCloseCurlyBraceOperator,
  ({ body, children }) => ({
    body,
    children,
    id: uuidv4(),
    type: NodeTypes.BLOCK_STATEMENT
  })
)

const BlockStatement = {
  parse: (context, tokenList) =>
    createBlockStatement({
      children: [],
      context,
      tokenList
    }),

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
  }
}

export default BlockStatement
