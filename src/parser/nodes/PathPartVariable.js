import { pipe } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createPathPartVariable from '../pipes/createPathPartVariable'
import expectCloseCurlyBraceOperator from '../pipes/expectCloseCurlyBraceOperator'
import expectDivideOperator from '../pipes/expectDivideOperator'
import expectOpenCurlyBraceOperator from '../pipes/expectOpenCurlyBraceOperator'
import identifyIdentifier from '../pipes/identifyIdentifier'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'
import parseOptionalAssignmentOperator from '../pipes/parseOptionalAssignmentOperator'
import parseOptionalMultiplyOperator from '../pipes/parseOptionalMultiplyOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipAssignmentOperator from '../pipes/skipAssignmentOperator'
import skipMultiplyOperator from '../pipes/skipMultiplyOperator'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parsePathPartVariableTokens = pipe(
  parseDivideOperator,
  parseOpenCurlyBraceOperator,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseOptionalAssignmentOperator,
  parseOptionalMultiplyOperator,
  parseOptionalMultiplyOperator,
  parseWhitespaceAndComments,
  parseCloseCurlyBraceOperator,
  createPathPartVariable
)

const identifyPathPartVariableChildren = pipe(
  expectDivideOperator,
  expectOpenCurlyBraceOperator,
  skipWhitespaceAndComments,
  identifyIdentifier,
  skipAssignmentOperator,
  skipMultiplyOperator,
  skipMultiplyOperator,
  skipWhitespaceAndComments,
  expectCloseCurlyBraceOperator
)

const PathPartVariable = {
  identify: (context, node) =>
    createPathPartVariable({
      ...identifyPathPartVariableChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PATH_PART_VARIABLE,
  parse: (context, tokenList) =>
    parsePathPartVariableTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) => {
    if (prevExpression) {
      // In this case, it's a CallExpression
      return false
    }
    const firstToken = tokenList.get(0)
    const secondToken = tokenList.get(1)
    return (
      firstToken &&
      firstToken.type === TokenTypes.OPERATOR_DIVIDE &&
      secondToken &&
      secondToken.type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
    )
  }
}

export default PathPartVariable
