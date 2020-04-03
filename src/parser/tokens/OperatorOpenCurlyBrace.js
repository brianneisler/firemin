import { OPERATOR_OPEN_CURLY_BRACE } from '../../constants/TokenTypes'

const REGEX_OPERATOR_OPEN_CURLY_BRACE_TEST = /^{/

const OperatorOpenCurlyBrace = {
  parse: () => ({
    length: 1,
    type: OPERATOR_OPEN_CURLY_BRACE,
    value: '{'
  }),
  test: (data) => REGEX_OPERATOR_OPEN_CURLY_BRACE_TEST.test(data)
}

export default OperatorOpenCurlyBrace
