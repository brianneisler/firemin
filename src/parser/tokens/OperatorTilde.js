import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_TILDE_TEST = /^~/

const OperatorTilde = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_TILDE,
    value: Operators.TILDE
  }),
  test: (context, data) => REGEX_OPERATOR_TILDE_TEST.test(data)
}

export default OperatorTilde
