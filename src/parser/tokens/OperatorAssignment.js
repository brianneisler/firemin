import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_ASSIGNMENT_TEST = /^=([^=]|$)/

const OperatorAssignment = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_ASSIGNMENT,
    value: Operators.ASSIGNMENT
  }),
  test: (context, data) => REGEX_OPERATOR_ASSIGNMENT_TEST.test(data)
}

export default OperatorAssignment
