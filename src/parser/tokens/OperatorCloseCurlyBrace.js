import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_CLOSE_CURLY_BRACE_TEST = /^}/

const OperatorCloseCurlyBrace = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_CLOSE_CURLY_BRACE,
    value: Operators.CLOSE_CURLY_BRACE
  }),
  test: (context, data) => REGEX_OPERATOR_CLOSE_CURLY_BRACE_TEST.test(data)
}

export default OperatorCloseCurlyBrace
