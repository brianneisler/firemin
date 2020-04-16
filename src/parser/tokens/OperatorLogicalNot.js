import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_LOGICAL_NOT_TEST = /^\!([^=]|$)/

const OperatorLogicalNot = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_LOGICAL_NOT,
    value: Operators.LOGICAL_NOT
  }),
  test: (context, data) => REGEX_OPERATOR_LOGICAL_NOT_TEST.test(data)
}

export default OperatorLogicalNot
