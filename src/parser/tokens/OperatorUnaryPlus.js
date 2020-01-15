import { OPERATOR_UNARY_PLUS } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_UNARY_PLUS_TEST = /^\+/

const OperatorUnaryPlus = {
  parse: () => ({
    length: 1,
    type: OPERATOR_UNARY_PLUS,
    value: '+'
  }),
  test: (data) => REGEX_OPERATOR_UNARY_PLUS_TEST.test(data)
}

export default OperatorUnaryPlus
