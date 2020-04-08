import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_UNARY_MINUS_TEST = /^-/

const OperatorUnaryMinus = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_UNARY_MINUS,
    value: Operators.UNARY_MINUS
  }),
  test: (context, data) => REGEX_OPERATOR_UNARY_MINUS_TEST.test(data)
}

export default OperatorUnaryMinus
