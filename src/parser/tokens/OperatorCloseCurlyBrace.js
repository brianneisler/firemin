import { OPERATOR_CLOSE_CURLY_BRACE } from '../../constants/TokenTypes'

const REGEX_OPERATOR_CLOSE_CURLY_BRACE_TEST = /^}/

const OperatorCloseCurlyBrace = {
  parse: () => ({
    length: 1,
    type: OPERATOR_CLOSE_CURLY_BRACE,
    value: '}'
  }),
  test: (data) => REGEX_OPERATOR_CLOSE_CURLY_BRACE_TEST.test(data)
}

export default OperatorCloseCurlyBrace
