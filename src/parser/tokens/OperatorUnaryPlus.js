import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_UNARY_PLUS_TEST = /^\+/

const OperatorUnaryPlus = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_UNARY_PLUS,
    value: Operators.UNARY_PLUS
  }),
  test: (context, data) => REGEX_OPERATOR_UNARY_PLUS_TEST.test(data)
}

export default OperatorUnaryPlus
