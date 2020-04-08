import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_MULTIPLY_TEST = /^\*/

const OperatorMultiply = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_MULTIPLY,
    value: Operators.MULTIPLY
  }),
  test: (context, data) => REGEX_OPERATOR_MULTIPLY_TEST.test(data)
}

export default OperatorMultiply
