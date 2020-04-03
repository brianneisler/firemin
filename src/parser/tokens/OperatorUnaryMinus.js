import { OPERATOR_UNARY_MINUS } from '../../constants/TokenTypes'

const REGEX_OPERATOR_UNARY_MINUS_TEST = /^-/

const OperatorUnaryMinus = {
  parse: () => ({
    length: 1,
    type: OPERATOR_UNARY_MINUS,
    value: '-'
  }),
  test: (data) => REGEX_OPERATOR_UNARY_MINUS_TEST.test(data)
}

export default OperatorUnaryMinus
