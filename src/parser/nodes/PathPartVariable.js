import { NodeTypes, TokenTypes } from '../../constants'
import { pipe } from 'ramda'
import parseCloseCurlyBraceOperator from '../pipes/parseCloseCurlyBraceOperator'
import parseDivideOperator from '../pipes/parseDivideOperator'
import parseIdentifier from '../pipes/parseIdentifier'
import parseOpenCurlyBraceOperator from '../pipes/parseOpenCurlyBraceOperator'
import parseOptionalAssignmentOperator from '../pipes/parseOptionalAssignmentOperator'
import parseOptionalMultiplyOperator from '../pipes/parseOptionalMultiplyOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'

const createPathPartVariable = pipe(
  parseDivideOperator,
  parseOpenCurlyBraceOperator,
  parseWhitespaceAndComments,
  parseIdentifier,
  parseOptionalAssignmentOperator,
  parseOptionalMultiplyOperator,
  parseOptionalMultiplyOperator,
  parseWhitespaceAndComments,
  parseCloseCurlyBraceOperator,
  ({ children, identifier }) => ({
    children,
    identifier,
    type: NodeTypes.PATH_PART_VARIABLE
  })
)

const PathPartVariable = {
  parse: (context, tokenList) => createPathPartVariable({ children: [], context, tokenList }),
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
