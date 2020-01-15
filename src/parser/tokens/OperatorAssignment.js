import { OPERATOR_ASSIGNMENT } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_ASSIGNMENT_TEST = /^=([^=]|$)/

const OperatorAssignment = {
  parse: () => ({
    length: 1,
    type: OPERATOR_ASSIGNMENT,
    value: '='
  }),
  test: (data) => REGEX_OPERATOR_ASSIGNMENT_TEST.test(data)
}

export default OperatorAssignment
