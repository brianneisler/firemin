import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_EQUALITY_TEST = /^==/

const OperatorEquality = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_EQUALITY,
    value: Operators.EQUALITY
  }),
  test: (context, data) => REGEX_OPERATOR_EQUALITY_TEST.test(data)
}

export default OperatorEquality
