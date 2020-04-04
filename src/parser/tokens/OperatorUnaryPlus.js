import { OPERATOR_UNARY_PLUS } from '../../constants/TokenTypes'

const REGEX_OPERATOR_UNARY_PLUS_TEST = /^\+/

const OperatorUnaryPlus = {
  parse: () => ({
    length: 1,
    type: OPERATOR_UNARY_PLUS,
    value: '+'
  }),
  test: (context, data) => REGEX_OPERATOR_UNARY_PLUS_TEST.test(data)
}

export default OperatorUnaryPlus
