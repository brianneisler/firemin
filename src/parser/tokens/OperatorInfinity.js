import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_INFINITY_TEST = /^∞/

const OperatorInfinity = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_INFINITY,
    value: Operators.INFINITY
  }),
  test: (context, data) => REGEX_OPERATOR_INFINITY_TEST.test(data)
}

export default OperatorInfinity
