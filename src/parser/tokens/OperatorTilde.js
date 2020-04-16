import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_SEMICOLON_TEST = /^;/

const OperatorTilde = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_SEMICOLON,
    value: Operators.TILDE
  }),
  test: (context, data) => REGEX_OPERATOR_SEMICOLON_TEST.test(data)
}

export default OperatorTilde
