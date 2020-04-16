import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_OPEN_CURLY_BRACE_TEST = /^{/

const OperatorOpenCurlyBrace = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_OPEN_CURLY_BRACE,
    value: Operators.OPEN_CURLY_BRACE
  }),
  test: (context, data) => REGEX_OPERATOR_OPEN_CURLY_BRACE_TEST.test(data)
}

export default OperatorOpenCurlyBrace
