import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_LOGICAL_OR_TEST = /^\|\|/

const OperatorLogicalOr = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_LOGICAL_OR,
    value: Operators.LOGICAL_OR
  }),
  test: (context, data) => REGEX_OPERATOR_LOGICAL_OR_TEST.test(data)
}

export default OperatorLogicalOr
