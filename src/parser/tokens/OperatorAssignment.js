import { OPERATOR_ASSIGNMENT } from '../../constants/TokenTypes'

const REGEX_OPERATOR_ASSIGNMENT_TEST = /^=([^=]|$)/

const OperatorAssignment = {
  parse: () => ({
    length: 1,
    type: OPERATOR_ASSIGNMENT,
    value: '='
  }),
  test: (context, data) => REGEX_OPERATOR_ASSIGNMENT_TEST.test(data)
}

export default OperatorAssignment
