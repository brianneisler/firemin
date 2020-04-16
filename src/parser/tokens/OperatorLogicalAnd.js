import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_LOGICAL_AND_TEST = /^&&/

const OperatorLogicalAnd = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_LOGICAL_AND,
    value: Operators.LOGICAL_AND
  }),
  test: (context, data) => REGEX_OPERATOR_LOGICAL_AND_TEST.test(data)
}

export default OperatorLogicalAnd
