import { OPERATOR_LOGICAL_AND } from '../../constants/TokenTypes'

const REGEX_OPERATOR_LOGICAL_AND_TEST = /^&&/

const OperatorLogicalAnd = {
  parse: () => ({
    length: 2,
    type: OPERATOR_LOGICAL_AND,
    value: '&&'
  }),
  test: (data) => REGEX_OPERATOR_LOGICAL_AND_TEST.test(data)
}

export default OperatorLogicalAnd
