import { OPERATOR_LOGICAL_NOT } from '../../constants/TokenTypes'

const REGEX_OPERATOR_LOGICAL_NOT_TEST = /^\!([^=]|$)/

const OperatorLogicalNot = {
  parse: () => ({
    length: 1,
    type: OPERATOR_LOGICAL_NOT,
    value: '!'
  }),
  test: (data) => REGEX_OPERATOR_LOGICAL_NOT_TEST.test(data)
}

export default OperatorLogicalNot
