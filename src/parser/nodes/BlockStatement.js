import { head, pipe } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createBlockStatement from '../pipes/createBlockStatement'
import expectCloseCurlyBraceOperator from '../pipes/expectCloseCurlyBraceOperator'
import expectOpenCurlyBraceOperator from '../pipes/expectOpenCurlyBraceOperator'
import identifyBodyUntil from '../pipes/identifyBodyUntil'
import parseBodyUntil from '../pipes/parseBodyUntil'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'

import CloseCurlyBraceOperator from './CloseCurlyBraceOperator'

const parseBlockStatementTokens = pipe(
  parseOpenCurlyBraceOperator,
  parseBodyUntil(
    ({ tokenList }) =>
      tokenList.get(0).type !== TokenTypes.OPERATOR_CLOSE_CURLY_BRACE
  ),
  parseCloseCurlyBraceOperator,
  createBlockStatement
)

const identifyBlockStatementChildren = pipe(
  expectOpenCurlyBraceOperator,
  identifyBodyUntil(({ children }) =>
    CloseCurlyBraceOperator.is(head(children))
  ),
  expectCloseCurlyBraceOperator
)

const BlockStatement = {
  identify: (context, node) =>
    createBlockStatement({
      ...identifyBlockStatementChildren({
        ...node,
        context
      }),
      children: node.children
    }),

  is: (value) => value && value.type === NodeTypes.BLOCK_STATEMENT,

  parse: (context, tokenList) =>
    parseBlockStatementTokens({
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
